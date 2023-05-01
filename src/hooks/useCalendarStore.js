import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector( state => state.calendar );

	const setActiveEvent = ( calendarEvent ) => {
		dispatch( onSetActiveEvent( calendarEvent ) );
	}

	const startSavingEvent = async( calendarEvent ) => {
		// TODO: go to backend

		// TODO: Everything okey
		if ( calendarEvent._id ) {
			// Updating
			dispatch( onUpdateEvent({ ...calendarEvent }) );
		} else {
			// Adding
			dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
		}

	}

	const startDeleteEvent = () => {
		//TODO: go to backend
		dispatch( onDeleteEvent() );
	}

	return {
		// Properties
		events,
		activeEvent,
		hasEventSelected: !!activeEvent?._id,
		
		//Methods
		setActiveEvent,
		startSavingEvent,
		startDeleteEvent,
	}
}
