import { User } from "../../model/user";
import userService from "../../service/user.service";
import { AuthenticationResponse, UserInput } from "../../types";
import bcrypt from 'bcrypt';
import userDB from "../../repository/user.db";
import { generateJwtToken } from "../../util/jwt";
import { Role } from "@prisma/client";


const name = 'testUser';
const email = 'testuser@example.com';
const role = 'admin'as Role;
const password = 'securePassword';
const hashedPassword = '$2b$10$hashedsample';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzQ2OTYzNjksImV4cCI6MTczNDcyNTE2OX0.5gPheVmpfLWN_CgoNukgAfjd_DRz8LG3106DKY0KxK8';
const user = new User({ name, email, role, password: hashedPassword });
const userInput = { name, email, role, password };
const authenticationResponse: AuthenticationResponse = {
    name,
    role,
    token,
};

let mockUserDbGetUserByUsername: jest.Mock;
let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockBcryptHash: jest.Mock;
let mockBcryptCompare: jest.Mock;
let mockGenerateJwtToken: jest.Mock;

beforeEach(() => {
    mockUserDbGetUserByUsername = jest.fn();
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbCreateUser = jest.fn();
    mockBcryptHash = jest.fn();
    mockBcryptCompare = jest.fn();
    mockGenerateJwtToken = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid user data, when creating a user, then the user is created successfully', async () => {
    // Given
    userDB.getUserByUsername = mockUserDbGetUserByUsername.mockResolvedValue(null);
    userDB.createUser = mockUserDbCreateUser.mockResolvedValue(user);
    bcrypt.hash = mockBcryptHash.mockResolvedValue(hashedPassword);

    // When
    const result = await userService.createUser(userInput);

    // Then
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith(name);
    expect(mockBcryptHash).toHaveBeenCalledTimes(1);
    expect(mockBcryptHash).toHaveBeenCalledWith(password, 10);
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(
        expect.objectContaining({
            name,
            email,
            role,
            password: hashedPassword,
        })
    );
    expect(result).toEqual(user);
});

test('given existing username, when creating a user, then an error is thrown', async () => {
    // Given
    userDB.getUserByUsername = mockUserDbGetUserByUsername.mockResolvedValue(user);

    // When
    try {
        await userService.createUser(userInput);
    } catch (error:any) {
        // Then
        expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith(name);
        expect(error.message).toBe('Username is already taken');
    }
});

test('given invalid credentials, when authenticating, then an error is thrown', async () => {
    // Given
    userDB.getUserByUsername = mockUserDbGetUserByUsername.mockResolvedValue(user);
    bcrypt.compare = mockBcryptCompare.mockResolvedValue(false);

    // When
    try {
        await userService.authenticate(userInput);
    } catch (error:any) {
        // Then
        expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith(name);
        expect(mockBcryptCompare).toHaveBeenCalledTimes(1);
        expect(mockBcryptCompare).toHaveBeenCalledWith(password, hashedPassword);
        expect(error.message).toBe('Invalid username or password.');
    }
});

test('given users in the database, when fetching all users, then all users are returned', async () => {
    // Given
    const users = [user];
    userDB.getAllUsers = mockUserDbGetAllUsers.mockResolvedValue(users);

    // When
    const result = await userService.getAllUsers();

    // Then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(users);
});
