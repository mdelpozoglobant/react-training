import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import UserContext from './context/userContext';
import CONSTANTS from './constants';

import Admin from './components/admin';
import EditUser from './components/edit-user';
import NewUser from './components/new-user';

function App() {
	const [users, setUsers] = useState([]);

	const getUsers = () => {
		fetch(`${CONSTANTS.BASE_URL}/${CONSTANTS.USER_API}`)
            .then(res => res.json())
            .then(data => {
				console.log(data);
                setUsers(data);
            });
	}

	const removeUser = (userId) => {
		fetch(`${CONSTANTS.BASE_URL}/${CONSTANTS.USER_API}/${userId}`, {
            method: 'DELETE'
		})
			.then(res => res.json())
			.then(data => {
				const newUsers = users.filter(user => user.id !== userId);
				setUsers(newUsers);
			});
	}

  	return (
		<UserContext.Provider value={{ users, getUsers, removeUser }}>
			<div className="container">
				<div className="hero is-fullheight is-white">
					<div className="hero-body">
						<Router>
							<Switch>
								<Route exact path="/users" component={Admin} />
								<Route exact path="/users/new" component={NewUser} />
								<Route path="/users/:userId" component={EditUser} />
							</Switch>
						</Router>
					</div>
				</div>
			</div>
		</UserContext.Provider>
  	);
}

export default App;
