import { User } from "../../model/user";
import { Role } from "../../types";

describe('User  class', () => {
    let user: User;

    beforeEach(() => {
        // Initialize a User instance before each test
        user = new User({
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            password: "securepassword",
            role: 'admin' as Role, // Ensure the role is cast to Role type
        });
    });

    test('given valid values for user, when: user is created, then user is created with those values', () => {
        expect(user.getId()).toEqual(1);
        expect(user.getName()).toEqual("John Doe");
        expect(user.getEmail()).toEqual("john.doe@example.com");
        expect(user.getPassword()).toEqual("securepassword");
        expect(user.getRole()).toEqual('admin' as Role);
    });

    test('when: setName is called, then: name is updated', () => {
        user.setName("Jane Doe");
        expect(user.getName()).toEqual("Jane Doe");
    });

    test('when: setEmail is called, then: email is updated', () => {
        user.setEmail("jane.doe@example.com");
        expect(user.getEmail()).toEqual("jane.doe@example.com");
    });

    test('when: setPassword is called, then: password is updated', () => {
        user.setPassword("newsecurepassword");
        expect(user.getPassword()).toEqual("newsecurepassword");
    });

    test('when: setRole is called, then: role is updated', () => {
        user.setRole('user' as Role);
        expect(user.getRole()).toEqual('user' as Role);
    });

    test('when: setName is called with an empty string, then: name is updated to empty', () => {
        user.setName("");
        expect(user.getName()).toEqual("");
    });

    test('when: setEmail is called with an invalid email, then: email is updated to invalid email', () => {
        user.setEmail("invalid-email");
        expect(user.getEmail()).toEqual("invalid-email");
    });

    test('when: setPassword is called with an empty string, then: password is updated to empty', () => {
        user.setPassword("");
        expect(user.getPassword()).toEqual("");
    });

    test('when: setRole is called with a new role, then: role is updated', () => {
        user.setRole('editor' as Role);
        expect(user.getRole()).toEqual('editor' as Role);
    });
});