import database from "../util/database";
import { EncounterTable } from "../model/encounterTable";

const getAllEncounterTables = async (): Promise<EncounterTable[]> => {
    try {
        const encounterTablePrisma = await database.encounterTable.findMany({
            include: {
                monsters: true
            }
        });
        return encounterTablePrisma.map((encounterTablePrisma) => EncounterTable.from(encounterTablePrisma));
    } catch (error) {
        throw new Error('Database error, see log for details');
    }
}

const getEncounterTableById = async (id: number): Promise<EncounterTable> => {
    try {
        const encounterTablePrisma = await database.encounterTable.findUnique({
            where: {
                id: id
            },
            include: {
                monsters: true
            }
        });
        if (!encounterTablePrisma) {
            throw new Error('Encounter table not found');
        }
        return EncounterTable.from(encounterTablePrisma);
    } catch (error) {
        throw new Error('Database error, see log for details');
    }
}

export default {
    getAllEncounterTables,
    getEncounterTableById
}