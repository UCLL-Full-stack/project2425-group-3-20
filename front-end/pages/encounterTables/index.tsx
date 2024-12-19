import EncounterTableOverviewTable from "@components/encounterTable/EncounterTableOverviewTable";
import { EncounterTable } from "@types";
import React, { useEffect, useState } from "react";
import EncounterTableService from "@services/EncounterTableService";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Header from "@components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const EncounterTables: React.FC = () => {
    const [encounterTables, setEncounterTables] = useState<EncounterTable[]>([]);
    const { t } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        const fetchEncounterTables = async () => {
            const response = await EncounterTableService.getEncounterTables();
            const encountertables = await response.json();
            setEncounterTables(encountertables);
        };
        fetchEncounterTables();
    }, []);

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