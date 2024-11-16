import { Monster } from '../model/monster';
import database from '../util/database';
import { Action } from '../model/action';
import { Monster as MonsterPrisma,
        Action as ActionPrisma
 } from '@prisma/client';


// 
const getAllMonsters  = async (): Promise<Monster[]> => {
    try {
        const monstersPrisma = await database.monster.findMany({
            include: {
                actions: true, // Include the related "action" data
            },
        });
        return monstersPrisma.map((monsterPrisma) => Monster.from(monsterPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
};
const deleteMonsterActions = async (monsterId: number, actionId: number): Promise<Monster> => {
    try {
        // Fetch the monster from the database
        const monsterPrisma = await database.monster.findUnique({
            where: { id: monsterId },
            include: { actions: true },  // Ensure actions are fetched
        });

        if (!monsterPrisma) {
            throw new Error(`Monster with ID ${monsterId} not found.`);
        }

        // Convert the fetched monster to a Monster class instance
        const monster = Monster.from(monsterPrisma);

        // Remove the action using the removeAction method
        monster.removeAction(actionId);

        // Update the monster in the database with the new actions list
        const updatedMonsterPrisma = await database.monster.update({
            where: { id: monsterId },
            data: {
                actions: {
                    set: [], // Prisma syntax to disconnect all related actions
                },
            },
            include: { actions: true }, // Fetch updated actions
        });

        // Return the updated monster
        return Monster.from(updatedMonsterPrisma);
    } catch (error) {
        throw new Error(`Failed to delete action: ${error}`);
    }
};

const createMonster = async ({
    name,
    str,
    dex,
    con,
    int,
    wis,
    cha,
    actions = [], // Default to empty array
    ac,
    hp,
    immunities = [], // Default to empty array
    languages = [],  // Default to empty array
    cr,
    type,
    movement,
}: MonsterPrisma & { actions?: ActionPrisma[] }): Promise<Monster> => { // Note optional actions
    try {
        const monsterPrisma = await database.monster.create({
            data: {
                name,
                str,
                dex,
                con,
                int,
                wis,
                cha,
                actions: actions.length
                    ? { connect: actions.map(action => ({ id: action.id })) }
                    : undefined,
                ac,
                hp,
                immunities,
                languages,
                cr,
                type,
                movement,
            },
            include: { actions: true }, // Include actions for completeness
        });
        return Monster.from(monsterPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default { getAllMonsters,createMonster,deleteMonsterActions };// getMonsterById,deleteMonster

//const actions: Action[] = [
    //     new Action({
    //         id: 0,
    //         name:"shortbow attack",
    //         description:"ranged attack 1d8 damage",
    //         type:'attack',
    //     }),
    //     new Action({
    //         id: 1,
    //         name:"shortsword attack",
    //         description:"melee attack 1d8 damage",
    //         type:'attack',
    //     }),
    // ];
    
    //     const monsters: Monster[] = [
    //         new Monster({
    //             id: 1,
    //             name: 'Goblin',
    //             str: 8,
    //             dex: 14,
    //             con: 10,
    //             int: 10,
    //             wis: 8,
    //             cha: 8,
    //             actions: [actions[0], actions[1]], 
    //             ac: 15,
    //             hp: 7,
    //             immunities: [],
    //             languages: ['Common', 'Goblin'],
    //             cr: "1/4",
    //             type: 'humanoid',
    //             movement: 30 
    //         }),
    //         new Monster({
    //             id: 2,
    //             name: 'Orc',
    //             str: 16,
    //             dex: 12,
    //             con: 16,
    //             int: 11,
    //             wis: 10,
    //             cha: 9,
    //             actions: [],
    //             ac: 13,
    //             hp: 15,
    //             immunities: [],
    //             languages: ['Common', 'Orc'],
    //             cr: "1/2",
    //             type: 'humanoid',
    //             movement: 30 
    //         }),
    //         new Monster({
    //             id: 3,
    //             name: 'Dragon',
    //             str: 20,
    //             dex: 10,
    //             con: 20,
    //             int: 14,
    //             wis: 12,
    //             cha: 18,
    //             actions: [],
    //             ac: 18,
    //             hp: 200,
    //             immunities: ['fire'],
    //             languages: ['Common', 'Draconic'],
    //             cr: "15",
    //             type: 'dragon',
    //             movement: 40 
    //         }),
    //         new Monster({
    //             id: 4,
    //             name: 'Zombie',
    //             str: 13,
    //             dex: 6,
    //             con: 16,
    //             int: 1,
    //             wis: 6,
    //             cha: 1,
    //             actions: [],
    //             ac: 8,
    //             hp: 22,
    //             immunities: ['poison', 'charmed', 'frightened'],
    //             languages: [],
    //             cr: "1/4",
    //             type: 'undead',
    //             movement: 20 
    //         })
    
    //     ];
    
    
    // const getAllMonsters = async (): Promise<Monster[]> => {
    
    //     return monsters;
    // };
    
    // const getMonsterById = async (monsterId: number): Promise<Monster> => {
    // ;
    //     const monster = monsters.find((monster) => monster.getId() === monsterId);
    //     if (!monster) {
    //         throw new Error('Monster not found');
    //     }
    //     return monster;
    // }
    // const deleteMonster = async (monsterId: number ): Promise<Monster> =>{
    
    //     const monster = getMonsterById(monsterId)
    //     const index = monsters.findIndex((monster) => monster.getId() === monsterId);
        
    //     monsters.splice(index, 1);
    
    //     return monster;
    // }
    
    // const deleteMonsterActions = async (monsterId: number): Promise<Monster> => {
    
    //     const monster = await getMonsterById(monsterId); 
    
    
    //     const index = monsters.findIndex((m) => m.getId() === monsterId);
    //     if (index === -1) {
    //         throw new Error('Monster not found');
    //     }
    
    
    //     monster.setActions([]);
    //     monsters[index] = monster;
    
    //     return monster; 
    // }