import { Monster, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
    // Clear existing data
    await prisma.encounterTable.deleteMany();
    await prisma.monster.deleteMany();
    await prisma.user.deleteMany();
    await prisma.action.deleteMany();

    // Create users
    const frans = await prisma.user.create({
        data: {
            email: "frans@gmail.com",
            password: await bcrypt.hash("frans123", 10),
            name: "frans",
            role: "gameMaster",
            
        },
    });
    const jan = await prisma.user.create({
        data: {
            email: "jan@gmail.com",
            password: await bcrypt.hash("jan123", 10),
            name: "jan",
            role: "guest",
            
        },
    });

    const admin = await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            password: await bcrypt.hash("admin123", 10),
            name: "admin",
            role: "admin",
        },
    });

    // Create actions
    const action1 = await prisma.action.create({
        data: {
            name: "Scimitar",
            description: "1d6 + 2",
            type: "attack",
        },
    });

    const action2 = await prisma.action.create({
        data: {
            name: "Longbow",
            description: "1d8 + 2",
            type: "attack",
        },
    });

    const action3 = await prisma.action.create({
        data: {
            name: "Fireball",
            description: "8d6",
            type: "spell",
        },
    });

    // Create monsters and connect actions
    const monster1: Monster = await prisma.monster.create({
        data: {
            name: "Goblin",
            ac: 15,
            hp: 7,
            cr: "0.25",
            str: 8,
            dex: 14,
            con: 10,
            int: 10,
            wis: 8,
            cha: 8,
            type: "humanoid",
            movement: 30,
            actions: {
                connect: [{ id: action1.id }],
            },
            owner:{
                connect : {id:admin.id}
            }
        },
    });

    const monster2: Monster = await prisma.monster.create({
        data: {
            name: "Orc",
            ac: 13,
            hp: 15,
            cr: "0.5",
            str: 16,
            dex: 12,
            con: 16,
            int: 7,
            wis: 11,
            cha: 10,
            type: "humanoid",
            movement: 30,
            actions: {
                connect: [{ id: action2.id }],
            },
            owner:{
                connect : {id:frans.id}
            }
        },
    });

    const monster3: Monster = await prisma.monster.create({
        data: {
            name: "Hill Giant",
            ac: 13,
            hp: 105,
            cr: "5",
            str: 21,
            dex: 8,
            con: 19,
            int: 5,
            wis: 9,
            cha: 6,
            type: "giant",
            movement: 40,
            actions: {
                connect: [{ id: action3.id }],
            },
            owner:{
                connect : {id:frans.id}
            }
        },
    });

    // Create encounter tables and connect monsters and users
    const encounterTable1 = await prisma.encounterTable.create({
        data: {
            name: "Goblin Encounter",
            description: "A group of goblins are attacking the village",
            owner: {
                connect: { id: frans.id },
            },
            monsters: {
                connect: [{ id: monster1.id },{id:monster2.id}],
            },
        },
    });

    const encounterTable2 = await prisma.encounterTable.create({
        data: {
            name: "Orc Encounter",
            description: "A group of orcs are attacking the village",
            owner: {
                connect: { id: frans.id },
            },
            monsters: {
                connect: [{ id: monster2.id }],
            },
        },
    });

    const encounterTable3 = await prisma.encounterTable.create({
        data: {
            name: "Hill Giant Encounter",
            description: "A lone hill giant wreaking havoc on the countryside",
            owner: {
                connect: { id: admin.id },
            },
            monsters: {
                connect: [{ id: monster3.id }],
            },
        },
    });

    console.log("Seed data created successfully!");
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
