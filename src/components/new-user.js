import React from 'react'; 
import UserForm from './forms/user.form';



class NewUser extends React.Component {
	BASE_URL = 'http://localhost:4000';
	API = 'users';

	state = {
		user: null
	}

	createUser = (user) => {
		fetch(`${this.BASE_URL}/${this.API}`, {
			method: 'post',
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
					<h2 className="subtitle is-3 has-text-centered">New User</h2>
					<div className="container">
						<div className="columns">
							<div className="column is-8 is-offset-2">
								<UserForm title="New" history={this.props.history} user={this.state.user} completedForm={this.createUser} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NewUser;