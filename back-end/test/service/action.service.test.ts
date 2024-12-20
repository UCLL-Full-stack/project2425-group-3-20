import actionDb from '../../repository/action.db';
import { Action } from '../../model/action';
import actionService from '../../service/action.service';
import { ActionType } from '../../types';


const actionId = 1;
const actionName = 'Sample Action';
const actionDescription = 'A sample action for testing';
const actionType: ActionType = 'attack';
const action = new Action({ 
    id: actionId, 
    name: actionName, 
    description: actionDescription, 
    type: actionType 
});

const actions = [action];

// Mock functions
let mockActionDbGetAllActions: jest.Mock;
let mockActionDbGetActionById: jest.Mock;

beforeEach(() => {
    mockActionDbGetAllActions = jest.fn();
    mockActionDbGetActionById = jest.fn();

    // Mocking the actionDb methods
    actionDb.getAllActions = mockActionDbGetAllActions;
    actionDb.getActionById = mockActionDbGetActionById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('when getting all actions, then actions are returned', async () => {
    // Given
    actionDb.getAllActions = mockActionDbGetAllActions.mockResolvedValue(actions);

    // When
    const result = await actionService.getAllActions();

    // Then
    expect(mockActionDbGetAllActions).toHaveBeenCalledTimes(1);
    expect(result).toEqual(actions);
});

test('when getting action by id, and action exists, then the action is returned', async () => {
    // Given
    actionDb.getActionById = mockActionDbGetActionById.mockResolvedValue(action);

    // When
    const result = await actionService.getActionById(actionId);

    // Then
    expect(mockActionDbGetActionById).toHaveBeenCalledTimes(1);
    expect(mockActionDbGetActionById).toHaveBeenCalledWith(actionId);
    expect(result).toEqual(action);
});

test('when getting action by id, and action does not exist, then an error is thrown', async () => {
    // Given
    actionDb.getActionById = mockActionDbGetActionById.mockResolvedValue(null);  // No action found

    // When
    try {
        await actionService.getActionById(actionId);
    } catch (error:any) {
        // Then
        expect(mockActionDbGetActionById).toHaveBeenCalledTimes(1);
        expect(mockActionDbGetActionById).toHaveBeenCalledWith(actionId);
        expect(error.message).toBe(`Action with id ${actionId} not found`);
    }
});
