import EncounterTableOverviewTable from "@components/encounterTable/EncounterTableOverviewTable";
import { EncounterTable, LoggedInUser } from "@types";
import React, { useEffect, useState } from "react";
import EncounterTableService from "@services/EncounterTableService";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Header from "@components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import  Head  from "next/head";

const EncounterTables: React.FC = () => {
    const [encounterTables, setEncounterTables] = useState<EncounterTable[]>([]);
    const { t } = useTranslation();
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    useEffect(() => {
            const loggedInUserString = localStorage.getItem("loggedInUser");
            if (loggedInUserString !== null) {
                setLoggedInUser(JSON.parse(loggedInUserString));
            }
        }, []);
    useEffect(() => {
        if(!loggedInUser){
        const fetchEncounterTables = async () => {
            const response = await EncounterTableService.getEncounterTables();
            const encountertables = await response.json();
            setEncounterTables(encountertables);
        };
        }
    }, []);
    if (!loggedInUser || (loggedInUser.role !== 'admin' && loggedInUser.role !== 'gameMaster')) {
        return (
            <>
                <Head>
                    <title>{t("monster.title.denied")}</title>
                </Head>
                <Header />
                <main className='d-flex flex-column justify-content-center align-items-center'>
                    <h4>{t("monster.title.denied")}</h4>
                    <p>{t("monster.deniedtext")}</p>
                </main>
            </>
        );
    }
    return (
        <>
            <Header></Header>
            <EncounterTableOverviewTable encounterTable={encounterTables} />
        </>
    )
};
export const getServerSideProps = async (context:{locale: any}) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};
export default EncounterTables;