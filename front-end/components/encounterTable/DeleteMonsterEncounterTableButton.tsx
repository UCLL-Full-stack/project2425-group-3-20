import EncounterTableService from "@services/EncounterTableService";
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
    };

    return (
        <button onClick={deleteMonster}>{t("encounterTable.delete")}</button>
    );
};

export default DeleteMonsterButton;