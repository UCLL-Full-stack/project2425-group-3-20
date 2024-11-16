import { Action } from "../model/action";
import database from "../util/database";




const getAllActions = async (): Promise<Action[]> => {
    try{
        const actionsPrisma = await database.action.findMany();
        return actionsPrisma.map((actionPrisma)=> Action.from(actionPrisma))
    }
    catch(error) {
        console.error(error);
        throw new Error('Database Error. see serverlogs')
    }
     
};

const getActionById = async (actionId: number): Promise<Action | null> => {
    try{
        const actionPrisma = await database.action.findUnique({
            where: { id: actionId },
        });
        return actionPrisma ? Action.from(actionPrisma) : null;
    }
    catch(error) {
        console.error(error);
        throw new Error('Database Error. see serverlogs')
    }
};

export default { getAllActions, getActionById };