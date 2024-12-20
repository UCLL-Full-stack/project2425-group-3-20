import monsterDb from '../../repository/monster.db';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import { Monster } from '../../model/monster';
import { User } from '../../model/user';
import { MonsterInput, UserInput } from '../../types';
import monsterService from '../../service/monster.service';

// Test data
const monsterId = 1;
const monsterName = 'Dragon';
const monsterStr = 18;
const monsterDex = 14;
const monsterCon = 16;
const monsterInt = 10;
const monsterWis = 12;
const monsterCha = 15;
const monsterAc = 17;
const monsterHp = 120;
const monsterCr = "10";
const monsterType = 'dragon';
const monsterMovement = 30;
const immunities = ['fire'];
const languages = ['common'];
const ownername = 'testUser';

const owner = new User({
    id: 1,
    name: "Owner Name",
    email: "owner@example.com",
    password: "securepassword",
    role: 'admin' as any, // Ensure the role is cast to Role type
});

// Initialize a Monster instance before each test
const monster = new Monster({
    id: 1,
    name: "Goblin",
    str: 10,
    dex: 14,
    con: 12,
    int: 8,
    wis: 10,
    cha: 8,
    actions: [], // Start with no actions
    ac: 15,
    hp: 30,
    immunities: ["poison"],
    languages: ["Common", "Goblin"],
    cr: "1/4",
    type: "humanoid",
    movement: 30,
    owner: owner,
});
const monsterInput: MonsterInput = {
    id: 0,  // or leave undefined if auto-generated
    name: monsterName,
    str: monsterStr,
    dex: monsterDex,
    con: monsterCon,
    int: monsterInt,
    wis: monsterWis,
    cha: monsterCha,
    ac: monsterAc,
    hp: monsterHp,
    immunities,
    languages,
    cr: monsterCr,
    type: monsterType,
    movement: monsterMovement,
    ownername,  // ownername to look up the User
    owner: {
        id: owner.getId()!,  // Use getter to access private fields
        name: owner.getName(),
        email: owner.getEmail(),
        password: owner.getPassword(),
        role: owner.getRole(),
    },
};

const monsters = [monster];

// Mock functions
let mockMonsterDbGetAllMonsters: jest.Mock;
let mockMonsterDbGetMonsterById: jest.Mock;
let mockMonsterDbCreateMonster: jest.Mock;
let mockMonsterDbGetMonstersByUser: jest.Mock;
let mockMonsterDbDeleteMonster: jest.Mock;
let mockUserServiceGetUserByUsername: jest.Mock;

beforeEach(() => {
    mockMonsterDbGetAllMonsters = jest.fn();
    mockMonsterDbGetMonsterById = jest.fn();
    mockMonsterDbCreateMonster = jest.fn();
    mockMonsterDbGetMonstersByUser = jest.fn();
    mockMonsterDbDeleteMonster = jest.fn();
    mockUserServiceGetUserByUsername = jest.fn();

    // Mocking the services and repositories
    monsterDb.getAllMonsters = mockMonsterDbGetAllMonsters;
    monsterDb.getMonsterById = mockMonsterDbGetMonsterById;
    monsterDb.createMonster = mockMonsterDbCreateMonster;
    monsterDb.getMonstersByUser = mockMonsterDbGetMonstersByUser;
    monsterDb.deleteMonster = mockMonsterDbDeleteMonster;
    userService.getUserByUsername = mockUserServiceGetUserByUsername;
});

afterEach(() => {
    jest.clearAllMocks();
});

// Test: Get all monsters
test('when getting all monsters, then monsters are returned', async () => {
    // Given
    monsterDb.getAllMonsters = mockMonsterDbGetAllMonsters.mockResolvedValue(monsters);

    // When
    const result = await monsterService.getAllMonsters();

    // Then
    expect(mockMonsterDbGetAllMonsters).toHaveBeenCalledTimes(1);
    expect(result).toEqual(monsters);
});

// Test: Get monster by ID (positive case)
test('when getting monster by id, and monster exists, then the monster is returned', async () => {
    // Given
    monsterDb.getMonsterById = mockMonsterDbGetMonsterById.mockResolvedValue(monster);

    // When
    const result = await monsterService.getMonsterById(monsterId);

    // Then
    expect(mockMonsterDbGetMonsterById).toHaveBeenCalledTimes(1);
    expect(mockMonsterDbGetMonsterById).toHaveBeenCalledWith(monsterId);
    expect(result).toEqual(monster);
});

// Test: Get monster by ID (negative case)
test('when getting monster by id, and monster does not exist, then an error is thrown', async () => {
    // Given
    monsterDb.getMonsterById = mockMonsterDbGetMonsterById.mockResolvedValue(null);

    // When
    try {
        await monsterService.getMonsterById(monsterId);
    } catch (error:any) {
        // Then
        expect(mockMonsterDbGetMonsterById).toHaveBeenCalledTimes(1);
        expect(mockMonsterDbGetMonsterById).toHaveBeenCalledWith(monsterId);
        expect(error.message).toBe(`Monster with id ${monsterId} not found`);
    }
});

// Test: Create monster
test('when creating a monster with valid data, then the monster is created and returned', async () => {
    // Given
    userService.getUserByUsername = mockUserServiceGetUserByUsername.mockResolvedValue(owner);
    monsterDb.createMonster = mockMonsterDbCreateMonster.mockResolvedValue(monster);

    

    // When
    const result = await monsterService.createMonster(monsterInput);

    // Then
    expect(mockUserServiceGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockMonsterDbCreateMonster).toHaveBeenCalledTimes(1);
    expect(mockMonsterDbCreateMonster).toHaveBeenCalledWith(expect.objectContaining({
        name: monsterName,
        str: monsterStr,
        dex: monsterDex,
        con: monsterCon,
        int: monsterInt,
        wis: monsterWis,
        cha: monsterCha,
        ac: monsterAc,
        hp: monsterHp,
        immunities,
        languages,
        cr: monsterCr,
        type: monsterType,
        movement: monsterMovement,
        ownerId: 1,
        owner: expect.objectContaining({
            id: 1,
            name: 'Owner Name', // Update expected name
            email: 'owner@example.com', // Update expected email
            password: 'securepassword', // Update expected password
            role: 'admin' // Update expected role
        })
    }));
    expect(result).toEqual(monster);
});

// Test: Get monsters by user
test('when getting monsters by username, and monsters exist, then they are returned', async () => {
    // Given
    monsterDb.getMonstersByUser = mockMonsterDbGetMonstersByUser.mockResolvedValue(monsters);
    userDb.getUserByUsername = mockUserServiceGetUserByUsername.mockResolvedValue(owner)

    // When
    const result = await monsterService.getMonstersByUser(ownername);

    // Then
    expect(mockMonsterDbGetMonstersByUser).toHaveBeenCalledTimes(1);
    expect(result).toEqual(monsters);
});

// Test: Delete monster
test('when deleting monster by id, and monster exists, then the monster is deleted and returned', async () => {
    // Given
    monsterDb.deleteMonster = mockMonsterDbDeleteMonster.mockResolvedValue(monster);

    // When
    const result = await monsterService.deleteMonster(monsterId);

    // Then
    expect(mockMonsterDbDeleteMonster).toHaveBeenCalledTimes(1);
    expect(result).toEqual(monster);
});

// Test: Delete monster (negative case)
test('when deleting monster by id, and monster does not exist, then an error is thrown', async () => {
    // Given
    monsterDb.deleteMonster = mockMonsterDbDeleteMonster.mockResolvedValue(null);

    // When
    try {
        await monsterService.deleteMonster(monsterId);
    } catch (error:any) {
        // Then
        expect(mockMonsterDbDeleteMonster).toHaveBeenCalledTimes(1);
        expect(error.message).toBe(`Monster with id ${monsterId} not found`);
    }
});
