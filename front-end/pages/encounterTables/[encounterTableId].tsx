import Header from "@components/header";
import EncounterTableService from "@services/EncounterTableService";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { EncounterTable, LoggedInUser } from "@types";

const EncounterTableInfo: React.FC = () => {
    const router = useRouter();
    const { encounterTableId } = router.query;
    const { t } = useTranslation();
    
    const [encounterTable, setEncounterTable] = useState<EncounterTable | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

    useEffect(() => {
        const loggedInUserString = localStorage.getItem("loggedInUser");
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            const getEncounterTable = async () => {
                const response = await EncounterTableService.getEncounterTableById(parseInt(encounterTableId));
                const encounterTable = await response.json();
                setEncounterTable(encounterTable);
            }
    }, [loggedInUser]);

    return (
        <>
            <Header />
            <main>
                {!encounterTableId }
                <section>
                    {error && <p>{t("encounterTable.error")}</p>}
                    {isLoading && <p>{t("encounterTable.loading")}</p>}
                    {encounterTable && (
                        <div>
                            <h1>{encounterTable.name}</h1>
                            <p>{encounterTable.description}</p>
                            <p>{encounterTable.owner}</p>
                            <ul>
                                {encounterTable.monsters.map((monster) => (
                                    <li key={monster.id}>{monster.name}</li>
                                ))}
                            </ul>
                            <button>
                                {t("encounterTable.removeMonster")}
                            </button>
                        </div>
                    )}
                </section>

            </main>
        </>
    )
}

export default EncounterTableInfo;