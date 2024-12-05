import { Monster } from "./monster";
import { Action } from "./action";
import { EncounterTable as EncounterTablePrisma, Monster as MonsterPrisma, Action as ActionPrisma } from "@prisma/client";

export class EncounterTable {
    private id?: number;
    private name: string;
    private monsters: Monster[];

    constructor(encounterTable: { id?: number, name: string, monsters: Monster[] }) {
        this.id = encounterTable.id;
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

    // setters:
    setName(name: string): void {
        this.name = name;
    }

    setMonsters(monsters: Monster[]): void {
        this.monsters = monsters;
    }

    static from({
        id,
        name,
        monsters = []
    }: EncounterTablePrisma & { monsters: (MonsterPrisma & { actions: ActionPrisma[] })[] }): EncounterTable {
        return new EncounterTable({
            id,
            name,
            monsters: monsters.map((monsterPrisma) => Monster.from(monsterPrisma))
        });
    }
}