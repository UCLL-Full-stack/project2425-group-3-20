import database from "../util/database";
import { EncounterTable } from "../model/encounterTable";

const getAllEncounterTables = async (): Promise<EncounterTable[]> => {
    try {
        const encounterTablePrisma = await database.encounterTable.findMany({
            include: {
                monsters: true
            }
        });
        return encounterTablePrisma.map((encounterTable) => new EncounterTable(encounterTable));
    } 