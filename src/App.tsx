import {useState} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';
import Board from './pages/Board'
import ListViewer from './pages/ListViewer'
import Store from './store/Store';
import Error from './pages/Error';

function App() {
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
		{storeInit &&
			<Router>
				<Routes>
					<Route path="/todo/" element={<Board />} />
					<Route path="/todo/create" element={<ListViewer />} />
					<Route path="/todo/edit/:id" element={<ListViewer />} />
					<Route path="/todo/error/404" element={<Error />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</Router>
		}
		</>
	);
}

export default App;
