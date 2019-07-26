import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from './modals/modal';

import UserContext from '../context/userContext';

const Header = ({titles}) => {
    return (
        <thead>
            <tr>
                {titles.map((t, i) => <th key={i}>{t}</th>)}
            </tr>
        </thead>
    );
}

const Row = ({user, number, handleRemove }) => {
    return (
        <tr key={user.id}>
            <td>{number}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>
                <button className="button is-small is-danger" onClick={(e) => handleRemove(user.id) }>Delete</button>
                <Link className="button is-small is-info" to={"/users/" + user.id}>Edit</Link>
            </td>
        </tr>
    )
}

const Users = () => {
    // const { data: users } = props;
    const context = useContext(UserContext);
    const [isActive, setActive] = useState(false);
    const [id, setId] = useState(null);

    const { users, getUsers, removeUser } = context;

    const titles = ['#', 'name', 'surname', 'email', 'actions' ];

    useEffect(() => {
        getUsers();
    }, [])

    const handleClose = (anwser) => {
        anwser && removeUser(id);
        setActive(false);
        setId(null);
    };

    const handleRemove = (id) => {
        setActive(true);
        setId(id);
    };

    return (
        <div>
            <h2 className="has-text-centered is-size-3 m-1">User List</h2>
            <table className="table is-striped is-hoverable is-fullwidth">
                <Header titles={titles} />
                <tbody>
                    {users.map((user, idx) => {
                        return (
                           <Row user={user} key={user.id} number={idx + 1} handleRemove={handleRemove} />
                        )
                    })}
                </tbody>
            </table>
            <Modal isActive={isActive} onClose={handleClose}>
                <header className="modal-card-head">
                    <p className="modal-card-title"> Are you sure you want to remove this item?</p>
                </header>
            </Modal>
        </div>
    );
}

export default Users;