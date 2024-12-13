import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { LoggedInUser, StatusMessage } from "@types";
import MonsterService from "@services/MonsterService";

const MonsterCreationForm = () => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [name, setName] = useState("");
  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [con, setCon] = useState(0);
  const [int, setInt] = useState(0);
  const [wis, setWis] = useState(0);
  const [cha, setCha] = useState(0);
  const [ac, setAc] = useState(0);
  const [hp, setHp] = useState(0);
  const [immunities, setImmunities] = useState("");
  const [languages, setLanguages] = useState(""); 
  const [cr, setCr] = useState("");
  const [type, setType] = useState("");
  const [movement, setMovement] = useState(0);
  const [ownername,setOwnername] = useState("")
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const { t } = useTranslation();
  const router = useRouter();

  const validate = () => {
    const errors = [];
    if (!name.trim()) errors.push(t("monster.validate.name"));
    if (str <= 0 || dex <= 0 || con <= 0 || int <= 0 || wis <= 0 || cha <= 0) {
      errors.push(t("monster.validate.stats"));
    }
    if (ac <= 0) errors.push(t("monster.validate.ac"));
    if (hp <= 0) errors.push(t("monster.validate.hp"));
    return errors;
  };
  useEffect(() => {
    const loggedInUserString = localStorage.getItem("loggedInUser");
    if (loggedInUserString !==null) { 
      setLoggedInUser(JSON.parse(loggedInUserString));
    } 
    
  }, []);
  const handleSubmit = async (event: React.FormEvent) => {

    const ownername = loggedInUser!.name
    event.preventDefault();
    setStatusMessages([]);

    const errors = validate();
    if (errors.length > 0) {
      setStatusMessages(errors.map((error) => ({ message: error, type: "error" })));
      return;
    }

    try {
      const payload = {
        name,
        str,
        dex,
        con,
        int,
        wis,
        cha,
        ac,
        hp,
        immunities: immunities.split(",").map((immunity) => immunity.trim()),
        languages: languages.split(",").map((language) => language.trim()),
        cr,
        type,
        movement,
        ownername
      };

      const response = await MonsterService.createMonster(payload); // Call your monster creation logic
      setStatusMessages([{ message: "success", type: "success" }]);
      setTimeout(() => router.push("/monsters"), 2000);
    } catch (error) {
      console.error("Error creating monster:", error);
      setStatusMessages([{ message: "error", type: "error" }]);
    }
  };

  return (
    <div>
      <h3>{t("monster.title")}</h3>
      {statusMessages && (
        <ul>
          {statusMessages.map(({ message, type }, index) => (
            <li
              key={index}
              className={classNames({ "text-red-800": type === "error", "text-green-800": type === "success" })}
            >
              {message}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("monster.label.name")}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>{t("monster.label.str")}</label>
          <input type="number" value={str} onChange={(e) => setStr(Number(e.target.value))} />
        </div>
        <div>
          <label>{t("monster.label.dex")}</label>
          <input type="number" value={dex} onChange={(e) => setDex(Number(e.target.value))} />
        </div>
        <div>
          <label>{t("monster.label.con")}</label>
          <input type="number" value={con} onChange={(e) => setCon(Number(e.target.value))} />
        </div>
        <div>
          <label>{t("monster.label.int")}</label>
          <input type="number" value={int} onChange={(e) => setInt(Number(e.target.value))} />
        </div>
        <div>
          <label>{t("monster.label.wis")}</label>
          <input type="number" value={wis} onChange={(e) => setWis(Number(e.target.value))} />
        </div>
        <div>
          <label>{t("monster.label.cha")}</label>
          <input type="number" value={cha} onChange={(e) => setCha(Number(e.target.value))} />
        </div>
        <div>
          <label>{t("monster.label.ac")}</label>
          <input type="number" value={ac} onChange={(e) => setAc(Number(e.target.value))} />
        </div>
        <div>
          <label>{t("monster.label.hp")}</label>
          <input type="number" value={hp} onChange={(e) => setHp(Number(e.target.value))} />
        </div>
        <div>
          <label>{t("monster.label.immunities")}</label>
          <input value={immunities} onChange={(e) => setImmunities(e.target.value)} placeholder="e.g., fire, poison" />
        </div>
        <div>
          <label>{t("monster.label.languages")}</label>
          <input value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="e.g., Common, Draconic" />
        </div>
        <div>
          <label>{t("monster.label.cr")}</label>
          <input type="string" value={cr} onChange={(e) => setCr(e.target.value)} />
        </div>
        <div>
          <label>{t("monster.label.type")}</label>
          <input value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div>
          <label>{t("monster.label.movement")}</label>
          <input value={movement} onChange={(e) => setMovement(Number(e.target.value))} />
        </div>
        <button type="submit">{t("monster.button.submit")}</button>
      </form>
    </div>
  );
};

export default MonsterCreationForm;
