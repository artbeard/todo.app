import {useState, ReactElement} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	Outlet
} from 'react-router-dom';
import Board from './pages/Board'
import ListViewer from './pages/ListViewer'
import Store from './store/Store';
import Error from './pages/Error';
import { getUser, getUid } from './use/getUser';
import User from './pages/User';
import { IUser } from './use/models'



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
	const [storeInit, setStoreInit] = useState(false);
	
	let currentUid = getUid();

	getUser()
		.then((user: IUser) => {
			currentUid = user.id;
			Store.init()
				.then(()=>{
					setStoreInit(true);
				});
		})
		.catch(()=>{
			setStoreInit(true);
		})
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
				<Routes>
					<Route path="/user" element={<User/>} />
					{/* <Route path="/user/:uid" element={<User/>} /> */}
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
