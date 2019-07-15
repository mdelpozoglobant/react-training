import React, { useState, useEffect } from 'react';
import UserForm from './forms/user.form';

const EditUser = (props) => {
    const id = props.match.params.userId;
    const BASE_URL = 'http://localhost:4000';
    const API = 'users';

    let [ user, setUser ] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/${API}/${id}`)
			.then(res => res.json())
			.then(user => {
				setUser(user);
			});
	}, []);
	
	const updateUser = (user) => {
		fetch(`${BASE_URL}/${API}/${user.id}`, {
			method: 'put',
			body: JSON.stringify(user),
			headers: {
				"Content-type": "application/json"
			}
		}).then(res => res.json())
			.then(data => {
				props.history.goBack();
			});
	};

    return (
        <div className="container">
            <div className="column is-10 is-offset-1">
                <h2 className="subtitle is-3 has-text-centered">Edit User</h2>
                <div className="container">
                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                            <UserForm title="Edit" history={props.history} user={user} completedForm={updateUser} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;