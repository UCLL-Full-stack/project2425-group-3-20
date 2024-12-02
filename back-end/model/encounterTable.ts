import { Monster } from "./monster";
import {EncounterTable as EncounterTablePrisma} from "@prisma/client";

export class EncounterTable {
    private id?: number;
    private name: string;
    private monsters: Monster[];

    constructor(encounterTable: {name: string, monsters: Monster[]}) {
        this.name = encounterTable.name;
        this.monsters = encounterTable.monsters;
    }

    // getters:
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getMonsters(): Monster[] {
        return this.monsters;
    }

    //setters:
    setName(name: string): void {
        this.name = name;
    }

    setMonsters(monsters: Monster[]): void {
        this.monsters = monsters;
    }

    static from({
        id,
        name,
        monsters
    }: Partial<EncounterTablePrisma>): EncounterTable {
        return new EncounterTable({
            id: id || 0,
            name: name!,
            monsters: monsters!
        });
    }
}