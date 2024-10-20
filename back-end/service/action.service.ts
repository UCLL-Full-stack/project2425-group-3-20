import actionDb from '../repository/action.db'
import { Action } from '../model/action';

const getAllActions = async (): Promise<Action[]> => {
    return actionDb.getAllActions();
}

const getActionById = async (actionId: number): Promise<Action | undefined> => {
    const action = await actionDb.getActionById(actionId);
    if (!action) {
        throw new Error(`Action with id ${actionId} not found`);
    }
    return action;
}


export default { getAllActions, getActionById };