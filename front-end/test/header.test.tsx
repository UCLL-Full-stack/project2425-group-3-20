import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import exp from "constants";
import { useRouter } from "next/router";
import Header from "../components/header";

window.React = React;
jest.mock('next/router', () => require('next-router-mock'));
test("renders header with navigation links", () => {
    render(<Header />);
    expect(screen.getByText("header.nav.home"));
    expect(screen.getByText("header.nav.monster"));
    expect(!screen.queryByText("header.nav.my_monster")).not
    expect(!screen.queryByText("header.nav.monster_creater")).not;
    expect(!screen.queryByText("header.nav.encounterTable")).not;
    expect(screen.getByText("header.nav.login"));
    expect(!screen.queryByText("header.nav.logout")).not
});
