import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUid, getToken, setUser, createUser, setCookie, getUser } from '../use/getUser';

//import { NotFoundError } from '../use/errors';
import Modal from '../components/Modal';
//import apiPoints from '../use/apiPoints';
import { IUser } from '../use/models';


/**
 * Страница Просмотр содержимого списка
 * @returns JSX
 */
function User() {
	const navigate = useNavigate();
	const params = useParams();

	const [createUserModal, setCreateUserModal] = useState(false);
	const [userName, setUserName] = useState('');
	const [errorUserName, setErrorUserName] = useState('');
	const [processing, setProcessing] = useState(false);

	const [currentUid, setCurrentUid] = useState(() => getUid());
	const [currentToken, setCurrentToken] = useState(() => getToken());

	let uid: number | undefined = params?.uid ? parseInt(params.uid) : undefined;
	let token: string | undefined = params?.token ?? undefined;
	
	console.log(uid, token);
	// if ((uid && token) && (!currentUid || !currentToken))
	// {
	// 	//Проверка пользователя currentUid/currentToken
	// 	getUser(uid, token);
	// }	

	//Если параметров нет
		// поиск папарметров в хранилище
			//Если в хранилище нет
				//Регистрация
			//В хрвнилище есть
				//Зарос с сервера
	//Если параметры есть
		//проверка на сервере
			//Если все ок
				//Установка cookies
			//Если ошибка
				//на регистрацию

	useEffect(()=>{
		//перенос пользователя
		if ((uid && token))
		{
			getUser(uid, token)
				.then((user: IUser) => {
					console.log('Перенесенный пользователь', user);
					setCurrentUid(getUid());
					setCurrentToken(getToken());
				});
		}
		else if (!currentUid || !currentToken)
		{
			console.log(currentUid, currentToken, 'Редрект На регистрацию');
			setCreateUserModal(true);
		}
		// else if (currentUid && uid === undefined)
		// {
		// 	console.log(currentUser, uid, 'На редирект /user/uid');
		// }
		// else if (currentUser === undefined && uid !== undefined)
		// {
		// 	console.log(currentUser, uid, 'Установить текущего пользователя(Сделать подверждение)');
		// }
		// else if (currentUser !== undefined && uid !== undefined && currentUser !== uid)
		// {
		// 	console.log(currentUser, uid, 'Уведомление о презаписи');
		// }
		else
		{
			setCreateUserModal(false);
		}

	}, [currentUid, currentToken, uid, token]);
	
	const careateNewUser = function() {
		setErrorUserName('');
		if (userName == '')
		{
			setErrorUserName('Введите имя или псевдоним');
			return;
		}
		setProcessing(true);
		createUser(userName)
			.then((createdUser: IUser) => {
				console.log(createdUser);
				setCurrentUid(createdUser.id);
				setCurrentToken(createdUser.hash as string);
				//setUser(createdUser.id, createdUser.hash as string);
				navigate(`/user/:id`.replace(':id', String(createdUser.id)));
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(()=>{
				setProcessing(false);
			})
	};

	return (
		<>
			<div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
						<li className="breadcrumb-item"><Link to="/">Мои задачи</Link></li>
						<li className="breadcrumb-item active">Пользователь</li>
					</ul>
					<h1 className="page-header mb-0">{'Регистрация'}</h1>
				</div>
				<div className="ms-auto">
					<button
						className="btn btn-outline-default text-nowrap btn-sm px-3 rounded-pill"
						onClick={e=>{
							console.log('Скопировать ссылку на профиль');
						}}
						>
						<i className="far fa-copy  me-1 ms-n1"></i> Скопировать ссылку
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					
				</div>
			</div>

			{
				createUserModal &&
				<Modal header='Регистрация нового пользователя'
					onOk={careateNewUser}
					processing={processing}
					onCancel={()=>{setCreateUserModal(false)}}>
					<form className="row"
						onSubmit={(e) => {e.preventDefault(); careateNewUser();}}
						>
						<div className="form-group mb-3">
							<label className="form-label">Введите имя или псевдоним</label>
							<input type="text"
								className={'form-control' + (errorUserName !== '' ? ' is-invalid' : '')}
								value={userName}
								onChange={(e) => {setUserName(e.target.value)}}
								/>
								{errorUserName && <div className="invalid-feedback">{errorUserName}</div>}
						</div>
					</form>
				</Modal>
			}
		</>
	);
}

export default User;
