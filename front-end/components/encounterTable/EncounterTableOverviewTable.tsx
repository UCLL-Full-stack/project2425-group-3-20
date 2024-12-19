import { EncounterTable } from "@types";
import Link from "next/link";
import React, { use, useState } from "react";
import router from "next/router";
import EncounterTableService from "@services/EncounterTableService";
import { useTranslation } from "react-i18next";

type Props = {
    encounterTable: Array<EncounterTable>;
};

const EncounterTableOverviewTable: React.FC<Props> = ({ encounterTable }: Props) => {
    const goToEncounterTable = (encounterTable: EncounterTable) => {
        router.push(`/encounterTables/${encounterTable.id}`);
    };

    const { t } = useTranslation();

    return (
        <>
            {encounterTable && encounterTable.length > 0 ? (
                <div className="flex justify-center">
                    <table className="w-1/2 border-collapse mx-auto mt-5 rounded-lg">
                        <thead>
                            <tr>
                                <th className="bg-gray-200 text-gray-600 border border-gray-300 px-4 py-2">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {encounterTable.map((encounterTable) => (
                                <tr key={encounterTable.id} onClick={() => goToEncounterTable(encounterTable)} className="cursor-pointer hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{encounterTable.name}</td>
                                    {/* <td className="border border-gray-300 px-4 py-2">
                                        <Link href={`/encounterTables/${encounterTable.id}`}>
                                            <a className="text-blue-600 hover:text-blue-800">View</a>
                                        </Link>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            ) : (
                <h1 className="text-center mt-5">{t("encounterTable.notFound")}</h1>
            )}
        </>
    )
}

export default EncounterTableOverviewTable;