import actionDb from '../repository/action.db'
import { Action } from '../model/action';

const getAllActions = async (): Promise<Action[]> => {
    return actionDb.getAllActions();
}

const getActionById = async (actionId: number): Promise<Action> => {
    return actionDb.getActionById(actionId);
}


export default { getAllActions, getActionById };