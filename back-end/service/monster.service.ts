import monsterDb from '../repository/monster.db'
import { Monster } from '../model/monster';
import userDb from '../repository/user.db';
import { MonsterInput,UserInput } from '../types';
import userService from './user.service';
import { User } from '../model/user';
import de from 'date-fns/esm/locale/de/index.js';

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
    ownername,
}: MonsterInput): Promise<Monster> => {
    const owner:User = await userService.getUserByUsername(ownername);
    if (!owner)
        throw new Error(`Username with name${ownername} found`);

    const monster = await monsterDb.createMonster({
        id: 0, // or whatever logic you have for generating the id
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
        ownerId:owner.getId()!,
        owner: {
            id: owner.getId()!, 
            name: owner.getName()!,
            email: owner.getEmail()!, 
            password: owner.getPassword()!, 
            role: owner.getRole()!, 
        },
    });
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
const deleteMonster = async (monsterId:number): Promise<Monster| undefined> => {
    const monster  = await monsterDb.deleteMonster(monsterId);
    if (!monster) {
        throw new Error(`Monster with id ${monsterId} not found`);
    }
    return monster;
    
}


export default { getAllMonsters, getMonsterById,deleteMonster,getMonstersByUser,createMonster};