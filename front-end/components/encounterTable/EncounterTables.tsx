import { EncounterTable } from "@types";
import { useTranslation } from "react-i18next";

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
            <div className="text-center mt-5">
                {encounterTable.monsters.map((monster, index) => (
                    <h2 key={index}>{monster.name}</h2>
                ))}
            </div>
        </>
    )
}

export default EncounterTableDetail;