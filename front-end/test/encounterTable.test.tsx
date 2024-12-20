import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteMonsterButton from '../components/encounterTable/DeleteMonsterEncounterTableButton';
import React from 'react';


window.React = React;
jest.mock('../services/EncounterTableService', () => ({
  deleteMonsterFromEncounterTable: jest.fn().mockResolvedValue({}),
}));
jest.mock('next/router', () => require('next-router-mock'));
test('it renders the delete button with translated text', () => {
  // Mocking the return value for translation
  render(<DeleteMonsterButton encounterTableId={1} monsterId={1} />);

  const deleteButton = screen.getByText('encounterTable.delete');
  expect(deleteButton);
});

