import React, { Component } from 'react';
import UserForm from './forms/user.form';

class EditUser extends React.Component {
	BASE_URL = 'http://localhost:4000';
	API = 'users';

	state = {
		user: null
	}

	componentDidMount() {
		const id = this.props.match.params.userId;

		fetch(`${this.BASE_URL}/${this.API}/${id}`)
			.then(res => res.json())
			.then(user => {
				this.setState({ user });
			});
	}

	updateUser = (user) => {
		console.log(user);
		fetch(`${this.BASE_URL}/${this.API}/${user.id}`, {
			method: 'put',
			body: JSON.stringify(user),
			headers: {
				"Content-type": "application/json"
			}
		}).then(res => res.json())
			.then(data => {
				this.props.history.goBack();
			});
	};

	render() {
		return (
			<div className="container">
				<div className="column is-10 is-offset-1">
					<h2 className="subtitle is-3 has-text-centered">Edit User</h2>
					<div className="container">
						<div className="columns">
							<div className="column is-8 is-offset-2">
								<UserForm title="Edit" history={this.props.history} user={this.state.user} completedForm={this.updateUser} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default EditUser;