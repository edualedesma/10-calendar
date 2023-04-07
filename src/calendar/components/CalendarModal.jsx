import { useState } from 'react';
import Modal from 'react-modal';
import '../../styles.css';

const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

	const [isOpen, setIsOpen] = useState(true);

	const onCloseModal = () => {
		setIsOpen(false);
	}

	return (
		<Modal 
			isOpen={ isOpen }
			onRequestClose={ onCloseModal }
			style={ customStyles }
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={ 200 }
		>
			<h1>Hello Modal</h1>
			<hr />
			<p>Veniam culpa proident qui cupidatat excepteur elit eiusmod consectetur dolore quis.</p>
		</Modal>
	)
}
