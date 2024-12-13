import { Action } from "../model/action";


type Role = 'gameMaster' | 'admin' | 'guest';

type ActionType = 'attack' | 'movement' | 'spell' | 'legendary' | 'special';

type UserInput = {
    name: string;
    email: string;
    password: string;
    role: Role;
};
type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
};
type AuthenticationResponse = {
    token: string;
    name: string;
    role:Role
};
type MonsterInput = {
    id: number;          // Add id to match the target type
    name: string;
    str: number;  
    dex: number;  
    con: number;  
    int: number;  
    wis: number;  
    cha: number;  
    ac: number;  
    hp: number;  
    immunities: string[];  
    languages: string[];  
    cr: string;         // Ensure the `cr` is a string, as expected
    type: string;  
    movement: number; 
    ownername:string;
    owner:User;
};
export { Role, ActionType, UserInput,AuthenticationResponse,MonsterInput };