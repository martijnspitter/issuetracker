import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
	return ReactDOM.createPortal(
		<div onClick={props.onDismiss} className="modal">
			<div onClick={(e) => e.stopPropagation()} className="modal__content">
				<a href="#it-issuelist" className="popupai__close" onClick={props.onDismiss}>
					&times;
				</a>
				<div className="modal__header">{props.title}</div>
				<div className="modal__input">{props.input}</div>
				<div className="modal__actions">{props.actions}</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;
