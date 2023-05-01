import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

	const { startDeleteEvent, hasEventSelected } = useCalendarStore();
	const { isDateModalOpen } = useUiStore();

	const handleClickDelete = () => {
		startDeleteEvent();
	}

	return (
		<button
			className="btn btn-danger fab-danger"
			onClick={ handleClickDelete }
			style={{
				display: hasEventSelected ? '' : 'none'
			}}
		>
			<i className="fas fa-trash-alt"></i>
		</button>
	)
}
