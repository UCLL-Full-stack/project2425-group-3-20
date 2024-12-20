import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
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
    <div className="flex flex-col justify-center">
      <h3>{t("monster.title.create")}</h3>
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
      <form onSubmit={handleSubmit} className="w-1/2 border-collapse mx-auto my-2 rounded-lg justify-center">
        <div className="flex flex-col items-center">
          <label className="px-4 py-2">{t("monster.label.name")}</label>
          <input className="px-4 " value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.str")}</label>
          <input className="px-4" type="number" value={str} onChange={(e) => setStr(Number(e.target.value))} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.dex")}</label>
          <input className="px-4" type="number" value={dex} onChange={(e) => setDex(Number(e.target.value))} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.con")}</label>
          <input className="px-4" type="number" value={con} onChange={(e) => setCon(Number(e.target.value))} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.int")}</label>
          <input className="px-4" type="number" value={int} onChange={(e) => setInt(Number(e.target.value))} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.wis")}</label>
          <input className="px-4" type="number" value={wis} onChange={(e) => setWis(Number(e.target.value))} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.cha")}</label>
          <input className="px-4" type="number" value={cha} onChange={(e) => setCha(Number(e.target.value))} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.ac")}</label>
          <input className="px-4" type="number" value={ac} onChange={(e) => setAc(Number(e.target.value))} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.hp")}</label>
          <input className="px-4" type="number" value={hp} onChange={(e) => setHp(Number(e.target.value))} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.immunities")}</label>
          <input className="px-4" value={immunities} onChange={(e) => setImmunities(e.target.value)} placeholder={t("monster.example_immunities")} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.languages")}</label>
          <input className="px-4" value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder={t("monster.example_languages")} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.cr")}</label>
          <input className="px-4" type="string" value={cr} onChange={(e) => setCr(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.type")}</label>
          <input className="px-4" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <label className="px-4 py-1">{t("monster.label.movement")}</label>
          <input className="px-4" value={movement} onChange={(e) => setMovement(Number(e.target.value))} />
        </div>
        <button className="flex flex-col items-center" type="submit">{t("monster.button.submit")}</button>
      </form>
    </div>
  );
};

export default MonsterCreationForm;
