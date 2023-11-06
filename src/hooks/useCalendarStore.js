import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {
	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector( state => state.calendar );
	const { user } = useSelector( state => state.auth );

	const setActiveEvent = ( calendarEvent ) => {
		dispatch( onSetActiveEvent( calendarEvent ) );
	}

	const startSavingEvent = async( calendarEvent ) => {
		// TODO: Update event
		if ( calendarEvent._id ) {
			// Updating
			dispatch( onUpdateEvent({ ...calendarEvent }) );
		} else {
			// Adding
			const { data } = await calendarApi.post('/events', calendarEvent);
			dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
		}

	}

	const startDeleteEvent = () => {
		//TODO: go to backend
		dispatch( onDeleteEvent() );
	}

	const startLoadingEvents = async() => {
		try {
			
			const { data } = await calendarApi.get('/events');
			const events = convertEventsToDateEvents( data.events );
			dispatch( onLoadEvents( events ) );

		} catch (error) {
			console.log('Error when start loading events');
			console.log(error);
		}
	}

	return {
		// Properties
		events,
		activeEvent,
		hasEventSelected: !!activeEvent?._id,
		
		//Methods
		setActiveEvent,
		startDeleteEvent,
		startLoadingEvents,
		startSavingEvent,
	}
}
