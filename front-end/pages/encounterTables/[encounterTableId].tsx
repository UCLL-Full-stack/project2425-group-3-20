import Header from "@components/header";
import EncounterTableService from "@services/EncounterTableService";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { EncounterTable, LoggedInUser } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EncounterTableDetail from "@components/encounterTable/EncounterTables";
import DeleteMonsterButton from "@components/encounterTable/DeleteMonsterEncounterTableButton";

const EncounterTableInfo: React.FC = () => {
    const router = useRouter();
    const { encounterTableId } = router.query;
    const { t } = useTranslation();
    
    const [encounterTable, setEncounterTable] = useState<EncounterTable | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

    const getEncounterTableById = async () => {
        if (typeof encounterTableId === "string") {
            const parsedId = parseInt(encounterTableId); 
            const response = await EncounterTableService.getEncounterTableById(parsedId);
                const encounter_table = await response.json();
                console.log(encounter_table)
                setEncounterTable(encounter_table);
            } 
    };
    useEffect(() => {
        const loggedInUserString = localStorage.getItem("loggedInUser");
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
    }, []);
    useEffect(() =>{
        getEncounterTableById()
    }
    )
    

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
                            <table className="w-1/2 border-collapse mx-auto mt-5 rounded-lg">
                                <thead>
                                    <th>Monster</th>
                                    <th>Delete</th>
                                </thead>
                                <tbody>
                                    {encounterTable.monsters.map((monster, index) => (
                                        <tr key={monster.id}>
                                            <td>{monster.name}</td>
                                            <td>
                                                {encounterTable.id !== undefined && monster.id !== undefined && (
                                                    <DeleteMonsterButton encounterTableId={encounterTable.id} monsterId={monster.id} />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

            </main>
        </>
    )
}
export const getServerSideProps = async (context:{locale: any}) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default EncounterTableInfo;