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
const getMonstersByUser = async(username:string):Promise<Monster[]|undefined>=>{
    const user = await userDb.getUserByUsername(username)
    if (!user){
        throw new Error(`User with username ${username} not found`)
    }
    if (user.getId()== undefined){
        throw new Error(`User has no Id`)
    }
    const monsters : Monster[] = await monsterDb.getMonstersByUser(user.getId()!)
    return monsters
}
const deleteMonsterActions = async (monsterId:number): Promise<Monster| undefined> => {
    const monster  = await monsterDb.deleteMonsterActions(monsterId);
    if (!monster) {
        throw new Error(`Monster with id ${monsterId} not found `);
    }
    return monster;
    
}


export default { getAllMonsters, getMonsterById,deleteMonsterActions,getMonstersByUser};