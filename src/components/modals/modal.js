import ReactDOM from 'react-dom';
import React from 'react';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    render() {
        const { isActive, children, onClose } = this.props;

        return ReactDOM.createPortal(
            <div className={'modal' + (isActive ? ' is-active' : '') }>
                <div className="modal-background"></div>
                <div className="modal-card">
                    {children}
                    <footer className="modal-card-foot">
                        <a onClick={(e) => { onClose(false) }} className="button is-info">No</a>
                        <a onClick={(e) => { onClose(true) }} className="button is-danger">Yes</a>
                    </footer>
                </div>
            </div>,
            document.getElementById('modal')
        );
    }
}

export default Modal;