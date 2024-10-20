
import { Monster } from '../model/monster';
import database from '../util/database';
const getAllMonster  = async (): Promise<Monster[]> => {
    try {
        const monsterPrisma = await database.monster.findMany()
        return monsterPrisma.map((monsterPrisma) => Monster.from(monsterPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
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
    actions = [], // default to an empty array
    ac,
    hp,
    immunities,
    languages,
    cr,
    type,
    movement,
}: Monster): Promise<Monster> => {
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
                actions: {
                    connect: actions.map(action => ({ id: action.getId() })),
                }, 
                ac,
                hp,
                immunities,
                languages,
                cr,
                type,
                movement,
            },
        });
        return Monster.from(monsterPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};