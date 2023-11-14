import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Testing on authSlice', () => {

    test('should return the default state', () => {

        expect( authSlice.getInitialState() ).toEqual( initialState );

    });

    test('should make a login', () => {

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        // console.log(state);
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });

    });

    test('should make a logout', () => {

        const state = authSlice.reducer( authenticatedState, onLogout() );
        // console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });

    });

    test('should make a logout with error message', () => {

        const errorMessage = 'Invalid credentials';
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        // console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });

    });

    test('should clear the error message', () => {

        const errorMessage = 'Invalid credentials';
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        // console.log(state);
        const newState = authSlice.reducer( state, clearErrorMessage() );
        // console.log(newState);
        expect( newState.errorMessage ).toBe( undefined );
    });

    test('should change to onChecking', () => {

        const state = authSlice.reducer( authenticatedState, onChecking() );
        // console.log(state);
        expect( state ).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined
        });

    });

});