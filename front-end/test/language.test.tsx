import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Language from '@components/language/Language'; // Assuming Language.tsx is in the same directory
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRouterPush = jest.fn();

describe('Language Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      locale: 'en',
      pathname: '/',
      asPath: '/',
      query: {},
      push: mockRouterPush,
    });
    mockRouterPush.mockClear();
  });

  it('renders the language select with default locale', () => {
    render(<Language />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('en');
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('日本語')).toBeInTheDocument();
  });

  it('calls router.push with new locale when language is changed', () => {
    render(<Language />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'jp' } });

    expect(mockRouterPush).toHaveBeenCalledWith(
      { pathname: '/', query: {} },
      '/',
      { locale: 'jp' }
    );
    
    expect(console.log).toHaveBeenCalledWith("switching language");

    //Check if console.log is called 
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.change(selectElement, { target: { value: 'en' } });
    expect(consoleSpy).toHaveBeenCalledWith("switching language");
  });

  it('renders the language label', () => {
    render(<Language />);
    const labelElement = screen.getByLabelText('Language');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders with a different initial locale', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      locale: 'jp',
      pathname: '/',
      asPath: '/',
      query: {},
      push: mockRouterPush,
    });

    render(<Language />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('jp');
  });

  it('handles complex paths and queries', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      locale: 'en',
      pathname: '/users/[id]',
      asPath: '/users/123?tab=profile',
      query: { id: '123', tab: 'profile' },
      push: mockRouterPush,
    });

    render(<Language />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'jp' } });

    expect(mockRouterPush).toHaveBeenCalledWith(
      { pathname: '/users/[id]', query: { id: '123', tab: 'profile' } },
      '/users/123?tab=profile',
      { locale: 'jp' }
    );
  });
});