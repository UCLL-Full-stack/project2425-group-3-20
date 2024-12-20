import encounterTableDb from '../../repository/encounterTable.db';
import { EncounterTable } from '../../model/encounterTable';
import { Monster } from '../../model/monster';
import encounterTableService from '../../service/encounterTable.service';
import { User } from '../../model/user';
import { Action } from '../../model/action';

const encounterTableId = 1;
const encounterTableName = 'Table 1';

// Creating Monster instances directly
const user = new User({
    id: 1,
    name: 'User1',
    email: 'user1@example.com',
    password: 'password123', 
    role: 'admin'
});

const action1 = new Action({
    id: 1,
    name: 'Attack',
    description: 'A basic attack',
    type: 'attack',
});

const action2 = new Action({
    id: 2,
    name: 'Defend',
    description: 'A basic defend action',
    type: 'attack',
});

const monster1 = new Monster({
    id: 1,
    name: 'Monster 1',
    str: 15,
    dex: 12,
    con: 14,
    int: 10,
    wis: 8,
    cha: 6,
    actions: [action1],
    ac: 15,
    hp: 40,
    immunities: ['poison'],
    languages: ['common'],
    cr: '1/4',
    type: 'beast',
    movement: 30,
    owner: user,
});

const monster2 = new Monster({
    id: 2,
    name: 'Monster 2',
    str: 16,
    dex: 14,
    con: 15,
    int: 9,
    wis: 11,
    cha: 8,
    actions: [action2],
    ac: 16,
    hp: 50,
    immunities: ['fire'],
    languages: ['elvish'],
    cr: '1/2',
    type: 'undead',
    movement: 25,
    owner: user,
});

const encounterTable = new EncounterTable({
    id: encounterTableId,
    name: encounterTableName,
    monsters: [monster1, monster2],
});

const encounterTables = [encounterTable];

// Mock functions
let mockEncounterTableDbGetAllEncounterTables: jest.Mock;
let mockEncounterTableDbGetEncounterTableById: jest.Mock;
let mockEncounterTableDbDeleteMonsterFromEncounterTable: jest.Mock;

beforeEach(() => {
    mockEncounterTableDbGetAllEncounterTables = jest.fn();
    mockEncounterTableDbGetEncounterTableById = jest.fn();
    mockEncounterTableDbDeleteMonsterFromEncounterTable = jest.fn();

    // Mocking the encounterTableDb methods
    encounterTableDb.getAllEncounterTables = mockEncounterTableDbGetAllEncounterTables;
    encounterTableDb.getEncounterTableById = mockEncounterTableDbGetEncounterTableById;
    encounterTableDb.deleteMonsterFromEncounterTable = mockEncounterTableDbDeleteMonsterFromEncounterTable;
});

afterEach(() => {
    jest.clearAllMocks();
});

// Test: Get all encounter tables
test('when getting all encounter tables, then encounter tables are returned', async () => {
    // Given
    encounterTableDb.getAllEncounterTables = mockEncounterTableDbGetAllEncounterTables.mockResolvedValue(encounterTables);

    // When
    const result = await encounterTableService.getAllEncounterTables();

    // Then
    expect(mockEncounterTableDbGetAllEncounterTables).toHaveBeenCalledTimes(1);
    expect(result).toEqual(encounterTables);
});

// Test: Get encounter table by ID (positive case)
test('when getting encounter table by id, and encounter table exists, then the encounter table is returned', async () => {
    // Given
    encounterTableDb.getEncounterTableById = mockEncounterTableDbGetEncounterTableById.mockResolvedValue(encounterTable);

    // When
    const result = await encounterTableService.getEncounterTableById(encounterTableId);

    // Then
    expect(mockEncounterTableDbGetEncounterTableById).toHaveBeenCalledTimes(1);
    expect(mockEncounterTableDbGetEncounterTableById).toHaveBeenCalledWith(encounterTableId);
    expect(result).toEqual(encounterTable);
});

// Test: Get encounter table by ID (negative case)
test('when getting encounter table by id, and encounter table does not exist, then an error is thrown', async () => {
    // Given
    encounterTableDb.getEncounterTableById = mockEncounterTableDbGetEncounterTableById.mockResolvedValue(null);  // No encounter table found

    // When
    try {
        await encounterTableService.getEncounterTableById(encounterTableId);
    } catch (error: any) {
        // Then
        expect(mockEncounterTableDbGetEncounterTableById).toHaveBeenCalledTimes(1);
        expect(mockEncounterTableDbGetEncounterTableById).toHaveBeenCalledWith(encounterTableId);
        expect(error.message).toBe(`Encounter table with id ${encounterTableId} not found`);
    }
});

// Test: Delete monster from encounter table (positive case)
test('when deleting a monster from an encounter table, then the encounter table is updated and returned', async () => {
    // Given
    const monsterIdToDelete = 2;
    const updatedEncounterTable = new EncounterTable({
        id: encounterTableId,
        name: encounterTableName,
        monsters: [monster1], // Monster 2 has been deleted
    });
    encounterTableDb.deleteMonsterFromEncounterTable = mockEncounterTableDbDeleteMonsterFromEncounterTable.mockResolvedValue(updatedEncounterTable);

    // When
    const result = await encounterTableService.deleteMonsterFromEncounterTable(encounterTableId, monsterIdToDelete);

    // Then
    expect(mockEncounterTableDbDeleteMonsterFromEncounterTable).toHaveBeenCalledTimes(1);
    expect(mockEncounterTableDbDeleteMonsterFromEncounterTable).toHaveBeenCalledWith(encounterTableId, monsterIdToDelete);
    expect(result).toEqual(updatedEncounterTable);
});

// Test: Delete monster from encounter table (negative case)
test('when deleting a monster from an encounter table, and encounter table does not exist, then an error is thrown', async () => {
    // Given
    const monsterIdToDelete = 2;
    encounterTableDb.deleteMonsterFromEncounterTable = mockEncounterTableDbDeleteMonsterFromEncounterTable.mockResolvedValue(null);  // No encounter table found

    // When
    try {
        await encounterTableService.deleteMonsterFromEncounterTable(encounterTableId, monsterIdToDelete);
    } catch (error: any) {
        // Then
        expect(mockEncounterTableDbDeleteMonsterFromEncounterTable).toHaveBeenCalledTimes(1);
        expect(mockEncounterTableDbDeleteMonsterFromEncounterTable).toHaveBeenCalledWith(encounterTableId, monsterIdToDelete);
        expect(error.message).toBe(`Encounter table with id ${encounterTableId} not found`);
    }
});
