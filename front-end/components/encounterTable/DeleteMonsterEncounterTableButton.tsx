import EncounterTableService from "@services/EncounterTableService";
import { useRouter } from "next/router";

type Props = {
    encounterTableId: number;
    monsterId: number;
};

const DeleteMonsterButton: React.FC<Props> = ({ encounterTableId, monsterId }: Props) => {
    const router = useRouter();

    const deleteMonster = async () => {
        await EncounterTableService.deleteMonsterFromEncounterTable(encounterTableId, monsterId);
        router.push(`/encounterTables/${encounterTableId}`);
    };

    return (
        <button onClick={deleteMonster}>Delete</button>
    );
};

export default DeleteMonsterButton;