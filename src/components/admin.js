import React, { Component } from 'react';
import Users from './users.js';

class Admin extends Component {
    BASE_URL = 'http://localhost:4000';
    API = 'users';
 
    state = {
        users: []
    }

    componentDidMount() {
        fetch(`${this.BASE_URL}/${this.API}`)
            .then(res => res.json())
            .then(users => {
                this.setState({ users })
            });
    }

    handleRemove = (id) => {
        fetch(`${this.BASE_URL}/${this.API}/${id}`, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(data => {
            this.setState((prevState) => {
                let { users } = prevState;
                users = users.filter(user => user.id !== id);
                return { users };
            });
        })
    }

    render() {
        console.log('render');
        return (
            <div>
                <Users data={this.state.users} onRemove={this.handleRemove}  />
            </div>
        );
    }
}

export default Admin;