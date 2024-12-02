import { Role } from "../types";

export class User {
    
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private role: Role;

    constructor(user: {id?:number,name: string, email: string, password: string, role: Role}) {
        this. id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    static from(userPrisma: {id?: number, name: string, email: string, password: string, role: Role}): User {
        return new User({
            id: userPrisma.id,
            name: userPrisma.name,
            email: userPrisma.email,
            password: userPrisma.password,
            role: userPrisma.role
        });
    }
    // getters:
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    //setters:
    setName(name: string): void {
        this.name = name;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setRole(role: Role): void {
        this.role = role;
    }

}