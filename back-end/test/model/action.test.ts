import { Action } from "../../model/action";
import { ActionType } from "../../types";

describe('Action class', () => {
    let action: Action;

    beforeEach(() => {
        // Initialize an Action instance before each test
        action = new Action({
            id: 1,
            name: "Slash",
            description: "A quick slash with a blade.",
            type: 'attack' as ActionType, // Ensure the type is cast to ActionType
        });
    });

    test('given valid values for action, when: action is created, then action is created with those values', () => {
        expect(action.getId()).toEqual(1);
        expect(action.getName()).toEqual("Slash");
        expect(action.getDescription()).toEqual("A quick slash with a blade.");
        expect(action.getType()).toEqual('attack' as ActionType);
    });

    test('when: setName is called, then: name is updated', () => {
        action.setName("Stab");
        expect(action.getName()).toEqual("Stab");
    });

    test('when: setDescription is called, then: description is updated', () => {
        action.setDescription("A quick stab with a blade.");
        expect(action.getDescription()).toEqual("A quick stab with a blade.");
    });

    test('when: setType is called, then: type is updated', () => {
        action.setType('defense' as ActionType);
        expect(action.getType()).toEqual('defense' as ActionType);
    });

    test('when: setName is called with an empty string, then: name is updated to empty', () => {
        action.setName("");
        expect(action.getName()).toEqual("");
    });

    test('when: setDescription is called with an empty string, then: description is updated to empty', () => {
        action.setDescription("");
        expect(action.getDescription()).toEqual("");
    });
});