import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.encounterTable.deleteMany();
    await prisma.monster.deleteMany();
    await prisma.user.deleteMany();
    await prisma.action.deleteMany();

    const user1 = await prisma.user.create({
        data: {
            email: "user1@gmail.com",
            password: await bcrypt.hash("password", 10),
            username: "user1",
            role: "gameMaster",
        },
        });
    };
    
    const user2 = await prisma.user.create({
        data: {
            email: "user2@gmail.com",
            password: await bcrypt.hash("password2", 10),
            username: "user2",
            role: "admin",
        },

    const monster1 = await prisma.monster.create({
        data: {
            name: "Goblin",
            armorClass: 15,
            hitPoints: 7,
            challenge: 0.25,
            experience: 50,
            strength: 8,
            dexterity: 14,
            constitution: 10,
            intelligence: 10,
            wisdom: 8,
            charisma: 8,
        },
    });

    const monster2 = await prisma.monster.create({
        data: {
            name: "Orc",
            armorClass: 13,
            hitPoints: 15,
            challenge: 0.5,
            experience: 100,
            strength: 16,
            dexterity: 12,
            constitution: 16,
            intelligence: 7,
            wisdom: 11,
            charisma: 10,
        },
    });

    const monster3 = await prisma.monster.create({
        data: {
            name: "Hill Giant",
            armorClass: 13,
            hitPoints: 105,
            challenge: 5,
            experience: 1800,
            strength: 21,
            dexterity: 8,
            constitution: 19,
            intelligence: 5,
            wisdom: 9,
            charisma: 6,
        },
    });

    const action1 = await prisma.action.create({
        data: {
            name: "Scimitar",
            description: "1d6 + 2",
            type: "attack",
            monsters: [monster1, monster2],
        },
    });

    const action2 = await prisma.action.create({
        data: {
            name: "Longbow",
            description: "1d8 + 2",
            type: "attack",
            monsters: [monster2],
        },
    });

    const action3 = await prisma.action.create({
        data: {
            name: "Fire ball",
            description: "8d6",
            type: "spell",
            monsters: [monster3],
        },
    });

    const encounterTable1 = await prisma.encounterTable.create({
        data: {
            name: "Goblin Encounter",
            description: "A group of goblins are attacking the village",
            monsters: [monster1],
            ownerId: user1.id,
            owner: {
                connect: {
                    id: user1.id,
                },
            },
        },
    });

    const encounterTable2 = await prisma.encounterTable.create({
        data: {
            name: "Orc Encounter",
            description: "A group of orcs are attacking the village",
            monsters: [monster2],
            ownerId: user1.id,
            owner: {
                connect: {
                    id: user1.id,
                },
            },
        },
    });