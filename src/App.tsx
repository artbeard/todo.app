import { useState, ReactElement } from 'react';
import * as ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	Outlet,
	Link
} from 'react-router-dom';
import Board from './pages/Board'
import ListViewer from './pages/ListViewer'
import Store from './store/Store';
import Error from './pages/Error';
import { getUid, getToken } from './use/getUser';
import User from './pages/User';


interface IProtectedRoute{
	userId: number | null | undefined,
}
function ProtectedRoute({ userId }: IProtectedRoute): ReactElement {
	if (!userId) {
	  return <Navigate to="/user" replace />;
	}
	return <Outlet /> as ReactElement;
};

function App() {
	
	let currentUid = getUid();
	let currentToken = getToken();
	const [storeInit, setStoreInit] = useState(false);
	Store.init()
		.then(()=>{
			setStoreInit(true);
		});
	return (
		<>
		{!storeInit && 
			<div className='col-12 py-5'>
				<div className="text-center">
					<div className="spinner-border"></div>
					<div>
						Загрузка...
					</div>
				</div>				
			</div>
		}
		{ //storeInit &&
			<Router basename={'/todo'}>
				{
					(currentUid && currentToken) &&
					ReactDOM.createPortal(
						(<div className="menu-item dropdown dropdown-mobile-full">
							<Link to={`/user`} className="menu-link">
								<div className="menu-text d-sm-block d-none">
									<i className="far fa-user"></i>&nbsp;
									Ваш аккаунт
								</div>
							</Link>
		            	</div>),
						document.getElementById('top-dropdown') as Element
					)
				}
				<Routes>
					<Route path="/user" element={<User/>} />
					<Route path="/user/:uid/:token" element={<User/>} />
					
					<Route element={<ProtectedRoute userId={currentUid} />}>
						<Route path="/" element={<Board/>} />
						<Route path="/create" element={<ListViewer />} />
						<Route path="/edit/:id" element={<ListViewer />} />
					</Route>
					
					<Route path="/error/404" element={<Error />} />
				</Routes>
			</Router>
		}
		</>
	);
}

export default App;
