import { Action } from "../model/action";

const actions: Action[] = [];

const getAllActions = async (): Promise<Action[]> => {
    return actions;
};

const getActionById = async (actionId: number): Promise<Action> => {
    const action = actions.find((action) => action.getId() === actionId);
    if (!action) {
        throw new Error('Action not found');
    }
    return action;
}

export default { getAllActions, getActionById };