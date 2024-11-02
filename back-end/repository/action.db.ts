import { Action } from "../model/action";

const actions: Action[] = [
    new Action({
        id: 0,
        name:"shortbow attack",
        description:"ranged attack 1d8 damage",
        type:'attack',
    }),
    new Action({
        id: 1,
        name:"shortsword attack",
        description:"melee attack 1d8 damage",
        type:'attack',
    }),
];

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