import EncounterTableService from "../../services/EncounterTableService";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Props = {
    encounterTableId: number;
    monsterId: number;
};

const DeleteMonsterButton: React.FC<Props> = ({ encounterTableId, monsterId }: Props) => {
    const {t} = useTranslation();
    const router = useRouter();

    const deleteMonster = async () => {
        await EncounterTableService.deleteMonsterFromEncounterTable(encounterTableId, monsterId);
        router.push(`/encounterTables/${encounterTableId}`);
        router.reload();
    };

    return (
        <button onClick={deleteMonster} className="px-2 py-2 bg-gray-200 text-black border-none rounded cursor-pointer transition-colors duration-300 hover:bg-gray-600">{t("encounterTable.delete")}</button>
    );
};

export default DeleteMonsterButton;