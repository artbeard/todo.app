import {useState} from 'react';
import {
	BrowserRouter as Router,
	Route,
//	Link,
	Routes
} from 'react-router-dom';
import Board from './pages/Board'
import ListViewer from './pages/ListViewer'
import Store from './store/Store';

function App() {
    //TODO Добавить анимацию загрузки приложения
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
			</Routes>
		</Router>
        }
		</>
	);
}

export default App;
