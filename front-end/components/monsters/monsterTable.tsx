import React, { useEffect, useState } from "react";
import { LoggedInUser, Monster } from "@types";
import { useRouter } from "next/router";
import MonsterService from "@services/MonsterService";

type Props = {
  monsters: Array<Monster>;
};

const monsterOverviewTable: React.FC<Props> = ({ monsters }: Props) => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    useEffect(() => {
        const loggedInUserString = localStorage.getItem("loggedInUser");
        if (loggedInUserString !==null) { 
          setLoggedInUser(JSON.parse(loggedInUserString));
        } 
        
      }, []);
    const deleteActions = async (id: number) => {
        const response = await MonsterService.deleteActions(id);
        if (response.ok) {
            router.reload();
        }
    };

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
                {loggedInUser && loggedInUser.role=="admin" &&(<td>
                  <button className="px-5 py-2 bg-red-700 text-black border-none rounded cursor-pointer transition-colors duration-300 hover:bg-red-300" onClick={((event) => {
                    event.stopPropagation();
                    if (monster.id !== undefined) {
                      deleteActions(monster.id);
                    }
                  })}>Delete Actions</button>
                </td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default monsterOverviewTable;
