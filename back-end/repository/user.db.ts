import { User } from '../model/user';
import { Role, UserInput } from '../types';
import database from '../util/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (  id: number ): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async (  name: string ): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { name },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const createUser = async ({
    name,
    password,
    role,
    email,
    
}:UserInput): Promise<User> => {
    try {
        const userPrisma= await database.user.create({
            data: {
                name: name,
                password: password,
                email: email,
                role: role,
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Database error. Unable to create user.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
};