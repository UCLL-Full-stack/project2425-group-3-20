import { Action } from "../model/action";
import { ActionType } from "../types";
import database from "../util/database";
import { 
    Action as ActionPrisma
} from '@prisma/client';


const createAction = async ({ name, description, type }:ActionPrisma ): Promise<Action> => {
    try {
        // Insert the new action into the database
        const actionPrisma = await database.action.create({
            data: {
                name,
                description,
                type,
            },
        });

        // Return the created action as an instance of the Action class
        return new Action(actionPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database Error. See server logs');
    }
};
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

export default { getAllActions, getActionById, createAction };