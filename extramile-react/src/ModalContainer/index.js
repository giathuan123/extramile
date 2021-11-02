import React, {Component} from 'react';
import {Modal} from './Modal'
import TriggerButton from './TriggerButton'

class ModalContainer extends Component {
    state = {isShown: false};

    showModal = () => {
        this.setState({isShown: true}, () => {
            this.closeButton.focus();
        });
        this.toggleScrollLock();
    }

    closeModal = () => {
        this.setState({isShown: false});
        this.TriggerButton.focus();
        this.toggleScrollLock();
    }

    onKeyDown = (e) => {
        if (e.keyCode === 27) {
            this.closeModal();
        }
    }

    onClickOutside = (e) => {
        // if (this.modal && this.modal.contains(e.target)) {
        //     return;
        // }
        // this.closeModal();
    }

    toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    }

    render() {
        return (
            <React.Fragment>
                <TriggerButton
                    showModal={this.showModal}
                    buttonRef={(n) => (this.TriggerButton = n)}
                    triggerText={this.props.triggerText}
                />
                {this.state.isShown ? (
                    <Modal
                        onSubmit={this.props.onSubmit}
                        modalRef={(n) => (this.closeButton = n)}
                        buttonRef={(n) => (this.closeButton = n)}
                        closeModal={this.closeModal}
                        onKeyDown={this.onKeyDown}
                        onClickOutside={this.onClickOutside}
                        modalBody={this.props.children}
                    />) : null}
            </React.Fragment>
        );
    }
}

export default ModalContainer;