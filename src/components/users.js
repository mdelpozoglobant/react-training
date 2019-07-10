import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({titles}) => {
    return (
        <thead>
            <tr>
                {titles.map((t, i) => <th key={i}>{t}</th>)}
            </tr>
        </thead>
    );
}

const Row = ({user, number, onRemove}) => {
    return (
        <tr key={user.id}>
            <td>{number}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>
                <button className="button is-small is-danger" onClick={(e) => onRemove(user.id) }>Delete</button>
                <Link className="button is-small is-info" to={"/users/" + user.id}>Edit</Link>
            </td>
        </tr>
    )
}

const Users = ({ data: users, onRemove }) => {
    // const { data: users } = props;

    const titles = ['#', 'name', 'surname', 'email', 'actions' ];

    return (
        <div>
            <h2 className="has-text-centered is-size-3 m-1">User List</h2>
            <table className="table is-striped is-hoverable is-fullwidth">
                <Header titles={titles} />
                <tbody>
                    {users.map((user, idx) => {
                        return (
                           <Row user={user} key={user.id} onRemove={onRemove} number={idx + 1} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Users;