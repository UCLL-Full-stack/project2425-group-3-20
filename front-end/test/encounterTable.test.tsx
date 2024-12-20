import { render, screen } from "@testing-library/react";
import React from "react";

import { EncounterTable } from "@types";
import EncounterTableOverviewTable from "../components/encounterTable/EncounterTableOverviewTable";

// Mock the DeleteMonsterButton component
jest.mock("../components/DeleteMonsterEncounterTableButton", () => jest.fn(() => <button>Delete</button>));
window.React = React;
const encounterTableMock = [{
  id: 123,
  name: "Dungeon Crawl",
  description: "A challenging dungeon with a variety of creatures.",
  owner: "DungeonMaster42",
  monsters: [
    {
      id: 1,
      name: "Goblin",
      str: 8,
      dex: 14,
      con: 10,
      int: 10,
      wis: 8,
      cha: 8,
      actions: [],
      ac: 15,
      hp: 7,
      immunities: ["poison"],
      languages: ["Common", "Goblin"],
      cr: "1/4",
      type: "Humanoid",
      movement: 30,
      ownername: "DungeonMaster42",
    },
    {
      id: 2,
      name: "Orc",
      str: 16,
      dex: 12,
      con: 14,
      int: 10,
      wis: 11,
      cha: 9,
      actions: [],
      ac: 13,
      hp: 15,
      immunities: [],
      languages: ["Common", "Orc"],
      cr: "1/2",
      type: "Humanoid",
      movement: 30,
      ownername: "DungeonMaster42",
    },
    {
      id: 3,
      name: "Dragon",
      str: 23,
      dex: 10,
      con: 21,
      int: 18,
      wis: 15,
      cha: 19,
      actions: [],
      ac: 19,
      hp: 200,
      immunities: ["fire"],
      languages: ["Common", "Draconic"],
      cr: "20",
      type: "Dragon",
      movement: 40,
      ownername: "DungeonMaster42",
    },
  ],
}];
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


