import React from 'react';

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
                <button onClick={(e) => onRemove(user.id) }>Delete</button>
                <button>Edit</button>
            </td>
        </tr>
    )
}

const Users = ({ data: users, onRemove }) => {
    // const { data: users } = props;

    const titles = ['#', 'name', 'surname', 'email', 'actions' ];

    return (
        <div>
            <h2>User List</h2>
            <table>
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