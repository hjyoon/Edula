import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Error404 from './views/Error404';
import Main from './views/Main';
import Profile from './views/Profile';
import Alarm from './views/Alarm';
import Setting from './views/Setting';
import Class from './views/Class';
import GlobalStyles from './styles/GlobalStyles';
import ContextProvider from './ContextProvider';
import routes from './routes';
import Login from './views/Login';
import ArticleForm from './views/ArticleForm';

function App() {
	return (
		<ContextProvider>
			<GlobalStyles />
			<Router>
				<Routes>
					<Route path={routes.main} element={<Main />} />
					<Route path={routes.login} element={<Login />} />
					<Route path={routes.setting} element={<Setting />} />
					<Route path={routes.profile} element={<Profile />} />
					<Route path={routes.alarm} element={<Alarm />} />
					<Route path={routes.class} element={<Class />} />
					<Route path={routes.articleform} element={<ArticleForm />} />
					<Route path='*' element={<Error404 />} />
				</Routes>
			</Router>
		</ContextProvider>
	);
}

export default App;
