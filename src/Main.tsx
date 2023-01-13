import { useState, useEffect, ReactElement } from 'react';
import * as ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	Outlet,
	Link
} from 'react-router-dom';
import { useUserContext } from './use/UserContext';
import Board from './pages/Board'
import ListViewer from './pages/ListViewer'
import Store from './store/Store';
import Error from './pages/Error';
import User from './pages/User';

interface IProtectedRoute{
	userId: number | null | undefined,
}
/**
 * Компонент для редиректа неавторизованных пользователей на регистрацию
 * @param param0 
 * @returns 
 */
function ProtectedRoute({ userId }: IProtectedRoute): ReactElement {
	if (!userId) {
	  return <Navigate to="/user" replace />;
	}
	return <Outlet /> as ReactElement;
};

export function Main() {
    const {currentUid}  = useUserContext()
	const [storeInit, setStoreInit] = useState(0); //-1 ошибка, 0 - загрузка, 1 - Ввсе ок!
    useEffect(() => {
        Store.init()
    		.then(()=>{
    			setStoreInit(1);
    		})
            .catch((err) => {
                setStoreInit(-1);
            });
    }, [currentUid]);

    return (<>
        {storeInit === 0 && 
            <div className='col-12 py-5'>
                <div className="text-center">
                    <div className="spinner-border"></div>
                    <div>
                        Загрузка...
                    </div>
                </div>				
            </div>
        }

        {storeInit === -1 && 
            <div className='col-12 py-5'>
                <div className="text-center">
                    <div className="alert alert-danger">
                        <strong>Во время загрузки произошла ошибка!</strong><br/>
                    </div>
                    <p className='my-3'>
                    Попробуйте повторить запрос позднее.
                    </p>
                </div>
            </div>
        }

        { //storeInit === 1 &&
            <Router basename={'/todo'}>
                {
                    currentUid &&
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
                    <Route path="/user/:uid/:token" element={<User/>} />
                    <Route path="/user" element={<User/>} />
                    
                    
                    <Route element={<ProtectedRoute userId={currentUid} />}>
                        <Route path="/edit/:id" element={<ListViewer />} />
                        <Route path="/create" element={<ListViewer />} />
                        <Route path="/" element={<Board/>} />
                    </Route>
                    
                    <Route path="/error/404" element={<Error />} />
                </Routes>
            </Router>
        }
    </>);
    
}