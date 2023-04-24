import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent } from '../store/calendar/calendarSlice';

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
		} else {
			// Adding
			dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
		}

	}

	return {
		// Properties
		events,
		activeEvent,
		
		//Methods
		setActiveEvent,
		startSavingEvent,
	}
}
