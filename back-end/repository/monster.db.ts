import { Monster } from '../model/monster';
import database from '../util/database';
import { Action } from '../model/action';
import { Monster as MonsterPrisma,
        Action as ActionPrisma,
        User as UserPrisma
 } from '@prisma/client';
import { connect } from 'http2';


 
const getAllMonsters  = async (): Promise<Monster[]> => {
    try {
        const monstersPrisma = await database.monster.findMany({
            include: {
                actions: true, 
                owner:true
            },
        });
        return monstersPrisma.map((monsterPrisma) => Monster.from(monsterPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
};
const getMonsterById = async (id: number): Promise<Monster | null> => {
    try {
        const monsterPrisma = await database.monster.findUnique({
            where: {
                id: id,
            },
            include: {
                actions: true, 
                owner:true
            },
        });

        if (!monsterPrisma) {
            throw new Error(`Monster with ID ${id} not found`);
        }

        return Monster.from(monsterPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};
const getMonstersByUser = async (userId: number): Promise<Monster[]> => {
    try {
        const monstersPrisma = await database.monster.findMany({
            where: {
                ownerId: userId, // Filter by the owner's ID
            },
            include: {
                actions: true,  // Include associated actions
                owner: true,    // Include owner details
            },
        });

        if (!monstersPrisma || monstersPrisma.length === 0) {
            throw new Error(`No monsters found for user with ID ${userId}`);
        }

        return monstersPrisma.map((monsterPrisma) => Monster.from(monsterPrisma));
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};


const deleteMonster = async (monsterId: number): Promise<Monster> => {
    try {
        const encounterTablesWithMonster = await database.encounterTable.findMany({
            where: {
                monsters: {
                    some: { id: monsterId }
                }
            },
            select: { id: true }
        });

        // Disconnect the monster from each encounter table
        for (const table of encounterTablesWithMonster) {
            await database.encounterTable.update({
                where: { id: table.id },
                data: {
                    monsters: {
                        disconnect: { id: monsterId }
                    }
                }
            });
        }

        // Fetch the monster from the database
        const monsterPrisma = await database.monster.delete({
            where: { id: monsterId },
            include: { actions: true,
                        owner:true
             },  // Ensure actions are fetched
        });

        

        // Return the updated monster
        return Monster.from(monsterPrisma);
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
    ac,
    hp,
    immunities = [], 
    languages = [],  
    cr,
    type,
    movement,
    owner
}: MonsterPrisma & { actions?: ActionPrisma[],owner:UserPrisma }): Promise<Monster> => { 
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
                ac,
                hp,
                immunities,
                languages,
                cr,
                type,
                movement,
                owner: { connect: { id: owner.id } }
            },
            include: { actions: true, owner:true }, // Include actions for completeness
        });
        return Monster.from(monsterPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default { getAllMonsters,createMonster,deleteMonster,getMonsterById,getMonstersByUser, };

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