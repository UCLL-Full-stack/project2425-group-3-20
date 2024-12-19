import { EncounterTable } from "@types";

const getEncounterTables = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/encounterTables/all", {
        method:"GET",
        headers:{
            "Content-Type" : "application/json"
        }
    });

    // if (!response.ok) {
    //     throw new Error(`Failed to fetch encounter tables: ${response.statusText}`);
    // }

    return response.json() as Promise<EncounterTable[]>;
};

const getEncounterTableById = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/encounterTables/${id}`,{
        method:"GET",
        headers:{
            "Content-Type" : "application/json"
        }
    });

    // if (!response.ok) {
    //     throw new Error(`Failed to fetch encounter table: ${response.statusText}`);
    // }

    return response.json() as Promise<EncounterTable>;
};

const deleteMonsterFromEncounterTable = async (encounterTableId:number, monsterId:number) =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/encounterTables/${encounterTableId}/monsters/${monsterId}`,{
        method:"PUT",
        headers:{
            "Content-Type" : "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete monster from encounter table: ${response.statusText}`);
    }

    return response.json() as Promise<EncounterTable>;
};

export default { getEncounterTables, getEncounterTableById, deleteMonsterFromEncounterTable };