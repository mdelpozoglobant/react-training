import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        return (
            <div className="container">
                <div className="columns">
									<div className="column is-10 is-offset-1">
										<Users data={this.state.users} onRemove={this.handleRemove} />
										<p className="has-text-centered" style={{marginTop: 15}}>
											<Link to="/users/new" className="button is-info">New User</Link>
										</p>
									</div>
								</div>
            </div>
        );
    }
}

export default Admin;