import { render, screen } from "@testing-library/react";
import React from "react";

import { EncounterTable } from "@types";
import EncounterTableOverviewTable from "../components/encounterTable/EncounterTableOverviewTable";

// Mock the DeleteMonsterButton component
jest.mock("../components/DeleteMonsterEncounterTableButton", () => jest.fn(() => <button>Delete</button>));
window.React = React;
test("renders encounter table details", () => {
  render(<EncounterTableOverviewTable encounterTable={[]} />);

  // Check if the table title and description render correctly
  expect(screen.getByText(encounterTableMock.name));
  expect(screen.getByText(encounterTableMock.description));
  expect(screen.getByText(encounterTableMock.owner));
  expect(screen.getAllByText("Delete").length).toBe(encounterTableMock.monsters.length);
});

// test("renders encounter table details", () => {
//   render(<EncounterTableOverviewTable encounterTable={[encounterTableMock]} />);

//   // Check if the table title and description render correctly
//   expect(screen.getByText(encounterTableMock.name));
//   expect(screen.getByText(encounterTableMock.description));
//   expect(screen.getByText(encounterTableMock.owner));

//   // Check if monsters appear in the table
//   encounterTableMock.monsters.forEach((monster) => {
//     expect(screen.getByText(monster.name));
//   });

//   // Check if Delete button is rendered for each monster
//   expect(screen.getAllByText("Delete").length).toBe(encounterTableMock.monsters.length);
// });


