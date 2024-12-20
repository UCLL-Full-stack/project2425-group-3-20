import { EncounterTable } from "../../model/encounterTable";
import { Monster } from "../../model/monster";
import { Action } from "../../model/action";
import { User } from "../../model/user";

describe('EncounterTable class', () => {
    let encounterTable: EncounterTable;
    let monster1: Monster;
    let monster2: Monster;

    beforeEach(() => {
        // Initialize some Monster instances before each test
        const owner = new User({
            id: 1,
            name: "Owner Name",
            email: "owner@example.com",
            password: "securepassword",
            role: 'admin' as any, // Ensure the role is cast to Role type
        });

        monster1 = new Monster({
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

        monster2 = new Monster({
            id: 2,
            name: "Orc",
            str: 16,
            dex: 12,
            con: 14,
            int: 8,
            wis: 10,
            cha: 8,
            actions: [], // Start with no actions
            ac: 13,
            hp: 45,
            immunities: [],
            languages: ["Common", "Orc"],
            cr: "1/2",
            type: "humanoid",
            movement: 30,
            owner: owner,
        });

        // Initialize an EncounterTable instance before each test
        encounterTable = new EncounterTable({
            id: 1,
            name: "Goblin and Orc Encounter",
            monsters: [monster1, monster2],
        });
    });

    test('given valid values for encounterTable, when: encounterTable is created, then encounterTable is created with those values', () => {
        expect(encounterTable.getId()).toEqual(1);
        expect(encounterTable.getName()).toEqual("Goblin and Orc Encounter");
        expect(encounterTable.getMonsters()).toEqual([monster1, monster2]);
    });

    test('when: setName is called, then: name is updated', () => {
        encounterTable.setName("New Encounter");
        expect(encounterTable.getName()).toEqual("New Encounter");
    });

    test('when: setMonsters is called, then: monsters are updated', () => {
        const monster3 = new Monster({
            id: 3,
            name: "Troll",
            str: 18,
            dex: 8,
            con: 16,
            int: 3,
            wis: 10,
            cha: 6,
            actions: [],
            ac: 12,
            hp: 84,
            immunities: [],
            languages: ["Common"],
            cr: "2",
            type: "giant",
            movement: 30,
            owner: new User({
                id: 2,
                name: "Another Owner",
                email: "another.owner@example.com",
                password: "anothersecurepassword",
                role: 'admin' as any,
            }),
        });

        encounterTable.setMonsters([monster3]);
        expect(encounterTable.getMonsters()).toEqual([monster3]);
    });

    test('when: setMonsters is called with an empty array, then: monsters are updated to empty', () => {
        encounterTable.setMonsters([]);
        expect(encounterTable.getMonsters()).toEqual([]);
    });
});