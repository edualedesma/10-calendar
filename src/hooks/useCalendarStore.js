import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector( state => state.calendar );
	const { user } = useSelector( state => state.auth );

	const setActiveEvent = ( calendarEvent ) => {
		dispatch( onSetActiveEvent( calendarEvent ) );
	}

	const startSavingEvent = async( calendarEvent ) => {
		
		try {
			if ( calendarEvent.id ) {
				// Updating
				await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
				dispatch( onUpdateEvent({ ...calendarEvent, user }) );
			} else {
				// Adding
				const { data } = await calendarApi.post('/events', calendarEvent);
				dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
			}
		} catch (error) {
			console.log(error);
			Swal.fire('Error when saving the event', error.response.data.msg, 'error');
		}
	}

	const startDeleteEvent = async() => {
		try {
			const { data } = await calendarApi.delete(`/events/${activeEvent.id}`);
			dispatch( onDeleteEvent() );
		} catch (error) {
			console.log(error);
			Swal.fire('Error when deleting the event', error.response.data.msg, 'error');
		}
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
		hasEventSelected: !!activeEvent?.id,
		
		//Methods
		setActiveEvent,
		startDeleteEvent,
		startLoadingEvents,
		startSavingEvent,
	}
}
