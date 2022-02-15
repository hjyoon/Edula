import { createContext } from 'react';

const UserContext = createContext({
	isLoggedIn: false,
	login: (_: string, __: string) => {},
	logout: () => {},
	userId: '',
	userStat: '',
	schoolId: '',
	profileImg: '',
});

export default UserContext;
