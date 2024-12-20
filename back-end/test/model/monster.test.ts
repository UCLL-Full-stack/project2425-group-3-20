import { Monster } from "../../model/monster";
import { User } from "../../model/user";
import { Action } from "../../model/action";
import { ActionType } from "../../types";

describe('Monster class', () => {
    let monster: Monster;
    let owner: User;

    beforeEach(() => {
        // Initialize a User instance as the owner
        owner = new User({
            id: 1,
            name: "Owner Name",
            email: "owner@example.com",
            password: "securepassword",
            role: 'admin' as any, // Ensure the role is cast to Role type
        });

        // Initialize a Monster instance before each test
        monster = new Monster({
            id: 1,
            name: "Goblin",
            str: 10,
            dex: 14,
            con: 12,
            int: 8,
            wis: 10,
            cha: 8,
            actions: [], // Start with no actions
            ac: 15,
            hp: 30,
            immunities: ["poison"],
            languages: ["Common", "Goblin"],
            cr: "1/4",
            type: "humanoid",
            movement: 30,
            owner: owner,
        });
    });

    test('given valid values for monster, when: monster is created, then monster is created with those values', () => {
        expect(monster.getId()).toEqual(1);
        expect(monster.getName()).toEqual("Goblin");
        expect(monster.getStr()).toEqual(10);
        expect(monster.getDex()).toEqual(14);
        expect(monster.getCon()).toEqual(12);
        expect(monster.getInt()).toEqual(8);
        expect(monster.getWis()).toEqual(10);
        expect(monster.getCha()).toEqual(8);
        expect(monster.getAc()).toEqual(15);
        expect(monster.getHp()).toEqual(30);
        expect(monster.getImmunities()).toEqual(["poison"]);
        expect(monster.getLanguages()).toEqual(["Common", "Goblin"]);
        expect(monster.getCr()).toEqual("1/4");
        expect(monster.getType()).toEqual("humanoid");
        expect(monster.getMovement()).toEqual(30);
        expect(monster.getOwner()).toEqual(owner);
    });

    test('when: setName is called, then: name is updated', () => {
        monster.setName("Orc");
        expect(monster.getName()).toEqual("Orc");
    });

    test('when: setStr is called, then: str is updated', () => {
        monster.setStr(15);
        expect(monster.getStr()).toEqual(15);
    });

    test('when: setDex is called, then: dex is updated', () => {
        monster.setDex(16);
        expect(monster.getDex()).toEqual(16);
    });

    test('when: setCon is called, then: con is updated', () => {
        monster.setCon(14);
        expect(monster.getCon()).toEqual(14);
    });

    test('when: setInt is called, then: int is updated', () => {
        monster.setInt(10);
        expect(monster.getInt()).toEqual(10);
    });

    test('when: setWis is called, then: wis is updated', () => {
        monster.setWis(12);
        expect(monster.getWis()).toEqual(12);
    });

    test('when: setCha is called, then: cha is updated', () => {
        monster.setCha(9);
        expect(monster.getCha()).toEqual(9);
    });

    test('when: setAc is called, then: ac is updated', () => {
        monster.setAc(18);
        expect(monster.getAc()).toEqual(18);
    });

    test('when: setHp is called, then: hp is updated', () => {
        monster.setHp(40);
        expect(monster.getHp()).toEqual(40);
    });

    test('when: setImmunities is called, then: immunities are updated', () => {
        monster.setImmunities(["poison", "fire"]);
        expect(monster.getImmunities()).toEqual(["poison", "fire"]);
    });

    test('when: setLanguages is called, then: languages are updated', () => {
        monster.setLanguages(["Common", "Orc"]);
        expect(monster.getLanguages()).toEqual(["Common", "Orc"]);
    });
    test('when: setCr is called, then: cr is updated', () => {
        monster.setCr("1/2");
        expect(monster.getCr()).toEqual("1/2");
    });

    test('when: setType is called, then: type is updated', () => {
        monster.setType("undead");
        expect(monster.getType()).toEqual("undead");
    });

    test('when: setMovement is called, then: movement is updated', () => {
        monster.setMovement(40);
        expect(monster.getMovement()).toEqual(40);
    });

    test('when: setOwner is called, then: owner is updated', () => {
        const newOwner = new User({
            id: 2,
            name: "New Owner",
            email: "new.owner@example.com",
            password: "newsecurepassword",
            role: 'user' as any, // Ensure the role is cast to Role type
        });
        monster.setOwner(newOwner);
        expect(monster.getOwner()).toEqual(newOwner);
    });

    test('when: setActions is called, then: actions are updated', () => {
        const action1 = new Action({ id: 1, name: "Slash", description: "A quick slash with a blade.", type: 'attack' as ActionType });
        const action2 = new Action({ id: 2, name: "Bite", description: "A sharp bite.", type: 'attack' as ActionType });
        monster.setActions([action1, action2]);
        expect(monster.getActions()).toEqual([action1, action2]);
    });

    test('when: removeAction is called with a valid actionId, then: action is removed', () => {
        const action1 = new Action({ id: 1, name: "Slash", description: "A quick slash with a blade.", type: 'attack' as ActionType });
        const action2 = new Action({ id: 2, name: "Bite", description: "A sharp bite.", type: 'attack' as ActionType });
        monster.setActions([action1, action2]);
        
        monster.removeAction(1); // Remove action with id 1
        expect(monster.getActions()).toEqual([action2]); // Only action2 should remain
    });

    test('when: removeAction is called with an invalid actionId, then: actions remain unchanged', () => {
        const action1 = new Action({ id: 1, name: "Slash", description: "A quick slash with a blade.", type: 'attack' as ActionType });
        const action2 = new Action({ id: 2, name: "Bite", description: "A sharp bite.", type: 'attack' as ActionType });
        monster.setActions([action1, action2]);
        
        monster.removeAction(3); // Attempt to remove a non-existent action
        expect(monster.getActions()).toEqual([action1, action2]); // Actions should remain unchanged
    });


});