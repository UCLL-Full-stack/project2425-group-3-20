import React from "react";
import { Monster } from "@types";

type Props = {
  monsters: Array<Monster>;
};

const monsterOverviewTable: React.FC<Props> = ({ monsters }: Props) => {
  return (
    <>
      {monsters && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Strength</th>
              <th scope="col">Dexterity</th>
              <th scope="col">Constitution</th>
              <th scope="col">Intelligence</th>
              <th scope="col">Wisdom</th>
              <th scope="col">Charisma</th>
              <th scope="col">Actions</th>
              <th scope="col">Armor Class</th>
              <th scope="col">Hit Points</th>
              <th scope="col">Immunities</th>
              <th scope="col">Languages</th>
              <th scope="col">Challenge Rating</th>
              <th scope="col">Type</th>
              <th scope="col">Movement</th>
            </tr>
          </thead>
          <tbody>
            {monsters.map((monster, index) => (
              <tr key={index} onClick={() => {}} role="button">
                <td>{monster.name}</td>
                <td>{monster.str}</td>
                <td>{monster.dex}</td>
                <td>{monster.con}</td>
                <td>{monster.int}</td>
                <td>{monster.wis}</td>
                <td>{monster.cha}</td>
                <td>
                  {monster.actions && monster.actions.map((action, index) => (
                    <div key={index}>{action.name}</div>
                  ))}
                </td>
                <td>{monster.ac}</td>
                <td>{monster.hp}</td>
                <td>{monster.immunities.join(", ")}</td>
                <td>{monster.languages.join(", ")}</td>
                <td>{monster.cr}</td>
                <td>{monster.type}</td>
                <td>{monster.movement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default monsterOverviewTable;
