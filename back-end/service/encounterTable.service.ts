import encounterTableDb from "../repository/encounterTable.db";
import { EncounterTable } from "../model/encounterTable";

const getAllEncounterTables = async (): Promise<EncounterTable[]> => {
    return encounterTableDb.getAllEncounterTables();
}

const getEncounterTableById = async (id: number): Promise<EncounterTable | undefined> => {
    const encounterTable = await encounterTableDb.getEncounterTableById(id);
    if (!encounterTable) {
        throw new Error(`Encounter table with id ${id} not found`);
    }
    return encounterTable;
}

export default { getAllEncounterTables, getEncounterTableById };