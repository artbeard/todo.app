import React from 'react';
import {
	BrowserRouter as Router,
	Route,
//	Link,
	Routes
} from 'react-router-dom';
import Board from './pages/Board'
import Editor from './pages/Editor'
import Store from './store/Store';

function App() {

    Store.init();
	return (
		<Router>
			<Routes>
				<Route path="/todo/" element={<Board />} />
				<Route path="/todo/create" element={<Editor />} />
				<Route path="/todo/edit/:id" element={<Editor />} />
			</Routes>
		</Router>
	);
}

export default App;
