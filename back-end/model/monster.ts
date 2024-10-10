import { Action } from "./action";
import { User } from "./user";

export class Monster {
    private id?: number;
    private name: string;
    private str: number;
    private dex: number;
    private con: number;
    private int: number;
    private wis: number;
    private cha: number;
    private actions?: Action[];
    private ac: number;
    private hp: number;
    private immunities: string[];
    private languages: string[];
    private cr: string;
    private type: string;
    private movement: number;
    private owner: User;

    constructor(monster: {
        id?: number;
        name: string;
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
        actions: Action[];
        ac: number;
        hp: number;
        immunities: string[];
        languages: string[];
        cr: string;
        type: string;
        movement: number;
        owner: User;
    }) {
        this.id = monster.id;
        this.name = monster.name;
        this.str = monster.str;
        this.dex = monster.dex;
        this.con = monster.con;
        this.int = monster.int;
        this.wis = monster.wis;
        this.cha = monster.cha;
        this.actions= monster.actions;
        this.ac = monster.ac;
        this.hp = monster.hp;
        this.immunities = monster.immunities;
        this.languages = monster.languages;
        this.cr = monster.cr;
        this.type = monster.type;
        this.movement = monster.movement;
        this.owner = monster.owner;
    }
        // Getter for id
        getId(): number | undefined {
            return this.id;
        }
    
        // Getters and Setters for all other fields
        getName(): string {
            return this.name;
        }
    
        setName(name: string) {
            this.name = name;
        }
    
        getStr(): number {
            return this.str;
        }
    
        setStr(str: number) {
            this.str = str;
        }
    
        getDex(): number {
            return this.dex;
        }
    
        setDex(dex: number) {
            this.dex = dex;
        }
    
        getCon(): number {
            return this.con;
        }
    
        setCon(con: number) {
            this.con = con;
        }
    
        getInt(): number {
            return this.int;
        }
    
        setInt(int: number) {
            this.int = int;
        }
    
        getWis(): number {
            return this.wis;
        }
    
        setWis(wis: number) {
            this.wis = wis;
        }
    
        getCha(): number {
            return this.cha;
        }
    
        setCha(cha: number) {
            this.cha = cha;
        }
        getActions(): Action[] | undefined{
            return this.actions;
        }
        setActions(actions : Action[]){
            this.actions = actions;
        }
    
        getAc(): number {
            return this.ac;
        }
    
        setAc(ac: number) {
            this.ac = ac;
        }
    
        getHp(): number {
            return this.hp;
        }
    
        setHp(hp: number) {
            this.hp = hp;
        }
    
        getImmunities(): string[] {
            return this.immunities;
        }
    
        setImmunities(immunities: string[]) {
            this.immunities = immunities;
        }
    
        getLanguages(): string[] {
            return this.languages;
        }
    
        setLanguages(languages: string[]){
            this.languages = languages;
        }
    
        getCr(): string {
            return this.cr;
        }
    
        setCr(cr: string) {
            this.cr = cr;
        }
    
        getType(): string {
            return this.type;
        }
    
        setType(type: string) {
            this.type = type;
        }
    
        getMovement(): number {
            return this.movement;
        }
    
        setMovement(movement: number) {
            this.movement = movement;
        }
    
        getOwner(): User {
            return this.owner;
        }
    
        setOwner(owner: User) {
            this.owner = owner;
        }
}
