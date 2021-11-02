const Trigger = ({ triggerText, buttonRef, showModal }) => {
    return (
        <button
            className="btn-primary"
            ref={buttonRef}
            onClick={showModal}
        >
            {triggerText}
        </button>
    );
}

export default Trigger;