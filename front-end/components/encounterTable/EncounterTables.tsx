import { EncounterTable } from "@types";
import { useTranslation } from "react-i18next";
import DeleteMonsterButton from "./DeleteMonsterEncounterTableButton";

type Props = {
    encounterTable: EncounterTable;
};
 

const EncounterTableDetail: React.FC<Props> = ({ encounterTable }) => {
    const { t } = useTranslation();

    return (
        <>
            <h4 className="text-center mt-5">{encounterTable.name}</h4>
            <h5 className="text-center mt-5">{encounterTable.description}</h5>
            <h5 className="text-center mt-5">{encounterTable.owner}</h5>
            <table className="w-1/2 border-collapse mx-auto mt-5 rounded-lg">
                <thead>
                    <th>{t("encounterTable.monster")}</th>
                    <th>{t("encounterTable.delete")}</th>
                </thead>
                <tbody>
                    {encounterTable.monsters.map((monster, index) => (
                        <tr key={monster.id}>
                            <td>{monster.name}</td>
                            <td>
                                {encounterTable.id !== undefined && monster.id !== undefined && (
                                    <button><DeleteMonsterButton encounterTableId={encounterTable.id} monsterId={monster.id} /></button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default EncounterTableDetail;