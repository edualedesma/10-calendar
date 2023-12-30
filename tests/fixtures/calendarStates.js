

export const events = [
    {
        _id: '1',
        title: 'Eduardo Birthday',
        notes: 'Buy a gift',
        start: new Date('2023-03-05 13:00:00'),
        end: new Date('2023-03-05 15:00:00'),
    },
    {
        _id: '2',
        title: 'Aixa Birthday',
        notes: 'Buy a gift 2',
        start: new Date('2023-12-19 13:00:00'),
        end: new Date('2023-12-19 15:00:00'),
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
};

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
};

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
};