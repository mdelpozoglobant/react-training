import { createContext } from 'react';

const userContext = createContext({
    users: [],
    getUsers: () => {}
});

export default userContext;