import monsterDb from '../repository/monster.db'
import { Monster } from '../model/monster';

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
const deleteMonster = async (monsterId:number): Promise<Monster| undefined> => {
    const monster  = await monsterDb.deleteMonster(monsterId);
    if (!monster) {
        throw new Error(`Monster with id ${monsterId} not found`);
    }
    return monster;
    
}


export default { getAllMonsters, getMonsterById,deleteMonster};