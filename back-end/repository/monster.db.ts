
import { Action } from '@prisma/client';
import { Monster } from '../model/monster';
import database from '../util/database';

const monsters: Monster[] = [];
const getAllMonsters = async (): Promise<Monster[]> => {
    return monsters;
};

const getMonsterById = async (monsterId: number): Promise<Monster> => {
    const monster = monsters.find((monster) => monster.getId() === monsterId);
    if (!monster) {
        throw new Error('Monster not found');
    }
    return monster;
}
const deleteMonster = async (monsterId: number ): Promise<Monster> =>{
    const monster = getMonsterById(monsterId)
    const index = monsters.findIndex((monster) => monster.getId() === monsterId);
    
    monsters.splice(index, 1);

    return monster;
}

const deleteMonsterAction = async (monsterId: number, actionId: number): Promise<Monster> => {
    const monster = await getMonsterById(monsterId)
    const actions = monster.getActions() || [];
    const index = actions.findIndex((action) => action.getId() === actionId);    
    
    if (index === -1) {
        throw new Error(`Action with ID ${actionId} does not exist on monster with ID ${monsterId}`);
    }
    
    actions.splice(index, 1);
    monster.setActions(actions)
    
    return monster;
}

export default { getAllMonsters, getMonsterById,deleteMonster,deleteMonsterAction };
// const getAllMonster  = async (): Promise<Monster[]> => {
//     try {
//         const monsterPrisma = await database.monster.findMany()
//         return monsterPrisma.map((monsterPrisma) => Monster.from(monsterPrisma))
//     } catch (error) {
//         throw new Error('Database error. See server log for details.')
//     }
// };
// const deleteMonsterAction = async (monsterId: number, actionId: number): Promise<Monster> => {
//     try {
//         // Fetch the monster from the database
//         const monsterPrisma = await database.monster.findUnique({
//             where: { id: monsterId },
//             include: { actions: true },  // Ensure actions are fetched
//         });

//         if (!monsterPrisma) {
//             throw new Error(`Monster with ID ${monsterId} not found.`);
//         }

//         // Convert the fetched monster to a Monster class instance
//         const monster = Monster.from(monsterPrisma);

//         // Remove the action using the removeAction method
//         monster.removeAction(actionId);

//         // Update the monster in the database with the new actions list
//         const updatedMonsterPrisma = await database.monster.update({
//             where: { id: monsterId },
//             data: {
//                 actions: {
//                     set: monster.getActions() ?? [],  // Prisma syntax to replace actions
//                 },
//             },
//             include: { actions: true },
//         });

//         // Return the updated monster
//         return Monster.from(updatedMonsterPrisma);
//     } catch (error) {
//         throw new Error(`Failed to delete action: ${error.message}`);
//     }
// };

// const createMonster = async ({
//     name,
//     str,
//     dex,
//     con,
//     int,
//     wis,
//     cha,
//     actions = [], // default to an empty array
//     ac,
//     hp,
//     immunities,
//     languages,
//     cr,
//     type,
//     movement,
// }: Monster): Promise<Monster> => {
//     try {
//         const monsterPrisma = await database.monster.create({
//             data: {
//                 name,
//                 str,
//                 dex,
//                 con,
//                 int,
//                 wis,
//                 cha,
//                 actions: {
//                     connect: actions.map(action => ({ id: action.getId() })),
//                 }, 
//                 ac,
//                 hp,
//                 immunities,
//                 languages,
//                 cr,
//                 type,
//                 movement,
//             },
//         });
//         return Monster.from(monsterPrisma);
//     } catch (error) {
//         throw new Error('Database error. See server log for details.');
//     }
// };
