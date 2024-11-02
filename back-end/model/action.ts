import { ActionType } from "../types";

export class Action {
    private id?: number;
    private name: string;
    private description: string;
    private type: ActionType;

    constructor(action: { id?: number,name: string, description: string, type: ActionType}) {
        this.id = action.id;
        this.name = action.name;
        this.description = action.description;
        this.type = action.type;
    }

    // getters:
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getType(): ActionType {
        return this.type;
    }

    //setters:
    setName(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setType(type: ActionType): void {
        this.type = type;
    }
}