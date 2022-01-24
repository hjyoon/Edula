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
import CreateArticle from './views/CreateArticle';
import Findid from './views/Findid';
import Findpw from './views/Findpw';
import UpdateArticle from './views/UpdateArticle';
import ArticleDetail from './views/ArticleDetail';
import Home from './views/Home';

function App() {
	return (
		<ContextProvider>
			<GlobalStyles />
			<Router>
				<Routes>
					<Route path={routes.login} element={<Login />} />
					<Route path={routes.findid} element={<Findid />} />
					<Route path={routes.findpw} element={<Findpw />} />
					<Route path={routes.main} element={<Home />}>
						<Route index element={<Main />} />
						<Route path={routes.setting} element={<Setting />} />
						<Route path={`${routes.profile}/:userId`} element={<Profile />} />
						<Route path={routes.alarm} element={<Alarm />} />
						<Route path={routes.class} element={<Class />} />
						<Route path={routes.createarticle} element={<CreateArticle />} />
						<Route path={routes.updatearticle} element={<UpdateArticle />} />
						<Route path={routes.articleDetail} element={<ArticleDetail />} />
					</Route>
					<Route path='*' element={<Error404 />} />
				</Routes>
			</Router>
		</ContextProvider>
	);
}

export default App;
