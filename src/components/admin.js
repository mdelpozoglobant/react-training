import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Users from './users.js';
import Modal from './modals/modal';

class Admin extends Component {
    BASE_URL = 'http://localhost:4000';
    API = 'users';
 
    state = {
        users: [],
        isActive: false,
        id: -1
    }

    handleRemove = (id) => {
        this.setState({
            isActive: true,
            id
        });
    }

    handleClose = (answer) => {
        if (answer) {
            this.deleteItem(this.state.id);
        }

        this.setState((prevState) => {
            return {
                isActive: !prevState.isActive,
                id: -1
            }
        });
    }

    deleteItem = (id) => {
        fetch(`${this.BASE_URL}/${this.API}/${id}`, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(data => {
            this.setState((prevState) => {
                let { users } = prevState;
                users = users.filter(user => user.id !== id);
                return { users };
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <Users />
                        <p className="has-text-centered" style={{marginTop: 15}}>
                            <Link to="/users/new" className="button is-info">New User</Link>
                        </p>
                    </div>
                </div>
                <Modal isActive={this.state.isActive} onClose={this.handleClose}>
                    <header className="modal-card-head">
                        <p className="modal-card-title"> Are you sure you want to remove this item?</p>
                    </header>
                </Modal>
            </div>
        );
    }
}

export default Admin;