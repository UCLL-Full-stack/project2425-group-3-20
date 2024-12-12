import { User } from '../model/user';
import userDB from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ( name: string ): Promise<User> => {
    const user = await userDB.getUserByUsername( name );
    if (!user) {
        throw new Error(`User with username: ${name} does not exist.`);
    }
    return user;
};
const createUser = async ({name,email,role,password}: UserInput): Promise<User> => {
    // Check if user already exists
    const existingUser = await userDB.getUserByUsername(name);
    if (existingUser) {
        throw new Error('Username is already taken');
    }
    if(!password){
        throw new Error('password is required');
    }

    // Hash the password
    password = await bcrypt.hash(password, 10);
    
    // Create the user and save to the database
    const user = await userDB.createUser({
        name,
        email,
        role,
        password
    });
    return user;
};
const authenticate = async ({name, password}:UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername(name);
    if (!user) throw new Error('Invalid username or password.');
    const hassedpassword = await bcrypt.hash(password, 10);
    const isPasswordValid = await bcrypt.compare(password, hassedpassword);
    if (!isPasswordValid) throw new Error('Invalid username or password.');
    const role =  user.getRole();
    const token = generateJwtToken({name,role});
    return {
        name,
        role,
        token,
    };
};
export default { getUserByUsername, getAllUsers,createUser,authenticate };
