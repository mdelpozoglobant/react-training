import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Admin from './components/admin';
import EditUser from './components/edit-user';
import NewUser from './components/new-user';

function App() {
  return (
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
  );
}

export default App;
