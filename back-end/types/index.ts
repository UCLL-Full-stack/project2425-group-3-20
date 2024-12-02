type Role = 'gameMaster' | 'admin' | 'guest';

type ActionType = 'attack' | 'movement' | 'spell' | 'legendary' | 'special';

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: Role;
};
type AuthenticationResponse = {
    token: string;
    name: string;
    role:Role
};
export { Role, ActionType, UserInput,AuthenticationResponse };