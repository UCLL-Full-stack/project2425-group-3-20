import React, { useEffect, useState } from "react";
import { LoggedInUser, Monster } from "@types";
import { useRouter } from "next/router";
import MonsterService from "@services/MonsterService";
import { useTranslation } from "next-i18next";

type Props = {
  monsters: Array<Monster>;
};

const monsterOverviewTable: React.FC<Props> = ({ monsters }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const loggedInUserString = localStorage.getItem("loggedInUser");
    if (loggedInUserString !== null) {
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
              <th scope="col">{t("monster.label.name")}</th>
              <th scope="col">{t("monster.label.str")}</th>
              <th scope="col">{t("monster.label.dex")}</th>
              <th scope="col">{t("monster.label.con")}</th>
              <th scope="col">{t("monster.label.int")}</th>
              <th scope="col">{t("monster.label.wis")}</th>
              <th scope="col">{t("monster.label.cha")}</th>
              <th scope="col">{t("monster.label.actions")}</th>
              <th scope="col">{t("monster.label.ac")}</th>
              <th scope="col">{t("monster.label.hp")}</th>
              <th scope="col">{t("monster.label.immunities")}</th>
              <th scope="col">{t("monster.label.languages")}</th>
              <th scope="col">{t("monster.label.cr")}</th>
              <th scope="col">{t("monster.label.type")}</th>
              <th scope="col">{t("monster.label.movement")}</th>
              {loggedInUser && loggedInUser.role === "admin" && (
                <th scope="col">{t("monster.label.deleteActions")}</th>
              )}
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
                  {monster.actions &&
                    monster.actions.map((action, index) => (
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
                {loggedInUser && (loggedInUser.role === "admin"|| loggedInUser.role ==="gameMaster" )&& (
                  <td>
                    <button
                      className="px-5 py-2 bg-red-700 text-black border-none rounded cursor-pointer transition-colors duration-300 hover:bg-red-300"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (monster.id !== undefined) {
                          deleteActions(monster.id);
                        }
                      }}
                    >
                      {t("monster.button.delete")}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default monsterOverviewTable;
