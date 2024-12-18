import database from "../util/database";
import { EncounterTable } from "../model/encounterTable";

const getAllEncounterTables = async (): Promise<EncounterTable[]> => {
    try {
        const encounterTablePrisma = await database.encounterTable.findMany({
            include: {
                monsters:{
                    include:{
                        actions:true,
                        owner:true
                    }
                }
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
                monsters:{include:{actions:true, owner:true}} 
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
const deleteMonsterFromEncounterTable = async (id: number, monsterId: number): Promise<EncounterTable> => {
    if (!id || !Number.isInteger(id)) {
        throw new Error(`Invalid id provided: ${id}`);
    }
    if (!monsterId || !Number.isInteger(monsterId)) {
        throw new Error(`Invalid monsterId provided: ${monsterId}`);
    }
    try {      
        const updatedEncounterTable = await database.encounterTable.update({
            where: {
                id: id,
            },
            data: {
                monsters: {
                    disconnect: { id: monsterId },
                },
            },
            include: {
                monsters: {
                    include: {
                        actions: true,
                        owner: true
                    }
                }
            },
        });
        return EncounterTable.from(updatedEncounterTable);
    } catch (error) {
        console.error("Error while disconnecting monster from encounter table:", error);
        throw new Error("Database error, see log for details");
    }
};


export default {
    getAllEncounterTables,
    getEncounterTableById,
    deleteMonsterFromEncounterTable
}