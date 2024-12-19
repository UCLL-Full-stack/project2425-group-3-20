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
            <h1 className="text-center mt-5">{encounterTable.name}</h1>
            <h2 className="text-center mt-5">{encounterTable.description}</h2>
            <h2 className="text-center mt-5">{encounterTable.owner}</h2>
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