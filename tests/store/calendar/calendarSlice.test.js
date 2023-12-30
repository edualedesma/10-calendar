import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('Testing on calendarSlice', () => {

    test('should return the default state', () => {
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    });

    test('onSetActiveEvent should active the event', () => {
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        expect( state.activeEvent ).toEqual( events[0] );
    });

    test('onAddNewEvent should add a new event', () => {
        const newEvent = {
            id: '3',
            title: 'Rambo birthday',
            notes: 'Buy a new gift',
            start: new Date('2022-08-23 10:00:00'),
            end: new Date('2022-08-23 12:00:00'),
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ));
        expect( state.events ).toEqual([ ...events, newEvent ]);
    });

    test('onUpdateEvent should update an event', () => {
        const updatedEvent = {
            title: 'Eduardo Birthday updated',
            notes: 'Buy a gift updated',
            start: new Date('2023-03-05 13:00:00'),
            end: new Date('2023-03-05 15:00:00'),
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ));
        expect( state.events ).toContain( updatedEvent );
    });

    test('onDeleteEvent should delete the active event', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        expect( state.activeEvent ).toBeNull();
        expect( state.events ).not.toContain( events[0] );
    });

    test('onLoadEvents should set the events', () => {
        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toStrictEqual( events );

        const newState = calendarSlice.reducer( state, onLoadEvents( events ) );
        expect( newState.events.length ).toBe( events.length );
    });

    test('should execute onLogoutCalendar to clear the state', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
        expect(state).toEqual( initialState );
    })

});