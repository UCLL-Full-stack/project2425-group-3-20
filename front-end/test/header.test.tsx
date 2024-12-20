import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import exp from "constants";
import Header from "../components/header";

window.React = React;
jest.mock('next/router', () => require('next-router-mock'));
test("renders header with navigation links", () => {
  render(<Header />);

  expect(screen.getByText("home"));
  expect(screen.getByText("shop"))
  expect(screen.getByText("shopingcart"))
  expect(screen.getByText("create Profile"))
});

test("renders login and logout links based on login status", () => {
  render(<Header />);

  // By default, should render the "Login" link
  expect(screen.getByText("Login"))
  expect(!screen.queryByText("Logout"))

  // Simulate logged-in state
  // fireEvent.click(screen.getByText("Login"));
  sessionStorage.setItem("loggedInUser", "testuser",);
  sessionStorage.setItem("token", "bjchDFLKVJDGkfdhgdodfgjjbfkngjlkjda")
  sessionStorage.setItem("role", "koper")
  render(<Header />);

  // // After logging in, should render the "Logout" link
  expect(screen.queryByText("Login")).not
  expect(screen.getByText("logout"))
});

test("calls logout function when clicking on logout link", () => {

  sessionStorage.setItem("loggedInUser", "testUser");
  render(<Header />);
  // Simulate a click on the "Logout" link
  act(() => {
    /* fire events that update state */
    fireEvent.click(screen.getByText("logout") as HTMLElement);
  });

  render(<Header />);

  // After logging out, the session storage should be cleared
  expect(sessionStorage.getItem("loggedInUser")).toBeNull();
  expect(sessionStorage.getItem("token")).toBeNull();
  expect(sessionStorage.getItem("role")).toBeNull();
  expect(screen.getByText("Login"))
  expect(screen.queryByText("Logout")).not
});

test("renders header with navigation links", () => {
  
  sessionStorage.setItem("loggedInUser", "testuser",);
  sessionStorage.setItem("token", "bjchDFLKVJDGkfdhgdodfgjjbfkngjlkjda")
  sessionStorage.setItem("role", "koper")
  render(<Header />);
  expect(screen.getByText("home"));
  expect(screen.getByText("shop"))
  expect(screen.getByText("shopingcart"))
  expect(screen.getByText("create Profile"))
  expect(screen.getByText("delete Buyer"))
});