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
    ownername:string;
};

export type Action = {
    id?: number;
    name: string;
    description: string;
    attackBonus: number;
    damage: string;
};
export type User = {
    name: string;
    password: string;
};
export type StatusMessage = {
    message: string;
    type: "error" | "success";
};
export type LoggedInUser  ={
    name: string;
    password: string;
    role:string;
}

export type EncounterTable = {
    id?: number;
    name: string;
    description: string;
    monsters: Monster[];
    owner:string;
};