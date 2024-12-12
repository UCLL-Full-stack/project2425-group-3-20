import monsterDb from '../repository/monster.db'
import { Monster } from '../model/monster';
import userDb from '../repository/user.db';

const getAllMonsters = async (): Promise<Monster[]> => {
    return monsterDb.getAllMonsters();
}

const getMonsterById = async (monsterId: number): Promise<Monster | undefined> => {
    const monster = await monsterDb.getMonsterById(monsterId);
    if (!monster) {
        throw new Error(`Monster with id ${monsterId} not found`);
    }
    return monster;
}
const getMonstersByUser = async(userId:number):Promise<Monster[]|undefined>=>{
    const user = await userDb.getUserById(userId)
    if (!user){
        throw new Error(`User with id ${userId} not found`)
    }
    const monsters : Monster[] = await monsterDb.getMonstersByUser(userId)
    return monsters
}
const deleteMonsterActions = async (monsterId:number): Promise<Monster| undefined> => {
    const monster  = await monsterDb.deleteMonsterActions(monsterId);
    if (!monster) {
        throw new Error(`Monster with id ${monsterId} not found `);
    }
    return monster;
    
}


export default { getAllMonsters, getMonsterById,deleteMonsterActions};