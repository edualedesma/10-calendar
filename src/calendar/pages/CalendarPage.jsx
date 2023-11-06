import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {

	const { openDateModal } = useUiStore();
	const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
	
	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

	const eventStyleGetter = ( event, start, end, isSelected ) => {

		const style = {
			backgroundColor: '#347CF7',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white'
		};

		return { 
			style 
		}
	}

	const onDoubleClick = ( event ) => {
		// console.log({ doubleClick: event });
		openDateModal();
	}

	const onSelect = ( event ) => {
		// console.log({ click: event });
		setActiveEvent( event );
	}

	const onViewchanged = ( view ) => {
		localStorage.setItem('lastView', view);
		setLastView( view );
	}

	useEffect(() => {
		startLoadingEvents();
	}, [])

	return (
		<>
			<Navbar />
			<Calendar
				culture='es'
				localizer={ localizer }
				events={ events }
				defaultView={ lastView }
				startAccessor="start"
				endAccessor="end"
				style={{ height: 'calc( 100vh - 80px )' }}
				messages={ getMessagesES() }
				eventPropGetter={ eventStyleGetter }
				components={{
					event: CalendarEvent
				}}
				onDoubleClickEvent={ onDoubleClick }
				onSelectEvent={ onSelect }
				onView={ onViewchanged }
    		/>
			<CalendarModal />
			<FabAddNew />
			<FabDelete />
		</>
	)
}
