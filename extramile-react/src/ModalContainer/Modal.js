import './Modal.css'

import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react'

export const Modal = ({
    onClickOutside,
    onKeyDown,
    modalRef,
    buttonRef,
    closeModal,
    modalBody
}) => {
    return ReactDOM.createPortal(
        <FocusTrap>
            <aside
                tabIndex="-1"
                className="modal-blur"
                onClick={onClickOutside}
                onKeyDown={onKeyDown}
            >
                <div className="modal-container" ref={modalRef}>
                    <button className="btn-primary"
                        ref={buttonRef}
                        className="modal-close-button"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                    
                    <div className="modal-body">
                        {modalBody}
                    </div>
                </div>
            </aside>
        </FocusTrap>,
    document.body
    );
}