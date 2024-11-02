export type Monster = {
    id?: number;
    name: string;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    actions?: Action[];
    ac: number;
    hp: number;
    immunities: string[];
    languages: string[];
    cr: string;
    type: string;
    movement: number;
};

export type Action = {
    id?: number;
    name: string;
    description: string;
    attackBonus: number;
    damage: string;
};