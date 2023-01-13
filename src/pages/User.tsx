import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUid, getToken, createUser, getUser } from '../use/getUser';

import Modal from '../components/Modal';
import { IUser } from '../use/models';
import { useUserContext } from '../use/UserContext';

/**
 * Страница Просмотр содержимого списка
 * @returns JSX
 */
function User() {
	const navigate = useNavigate();
	const params = useParams();

	//Параметр uid из uri
	let uid: number | undefined = params?.uid ? parseInt(params.uid) : undefined;
	//параметр token  из uri
	let token: string | undefined = params?.token ?? undefined;
	
	//Текущий user id (полученный из cookies)
	const [currentUid, setCurrentUid] = useState(() => getUid());
	//Текущий token (полученный из cookies)
	const [currentToken, setCurrentToken] = useState(() => getToken());
	
	//Статус успешности регистрации
	const [registerSuccess, setRegisterSuccess] = useState(false);
	//Модальное окно регистации
	const [createUserModal, setCreateUserModal] = useState(false);
	//Имя пользователя для регистрации
	const [userName, setUserName] = useState('');
	const [errorUserName, setErrorUserName] = useState('');
	// const [userEmail, setUserEmail] = useState('');
	// const [errorUserEmail, setErrorUserEmail] = useState('');
	//Статус запроса
	const [processing, setProcessing] = useState(false);
	//текущий пользователь
	const [currentUser, setCurrentUser] = useState({} as IUser);
	
    const {setUid} = useUserContext();

	useEffect(()=>{
		//Если пользователь переносит свой акк
		if ((uid && token))
		{
			getUser(uid, token)
				.then((user: IUser) => {
					setRegisterSuccess(true);
					setCreateUserModal(false);

					setCurrentUser(user);
					setCurrentUid(user.id);
					setCurrentToken(user.hash as string);
                    setUid(user.id);

					//Todo загрузка списков
					// Store.init()
					// 	.then(()=>{});

				});
		}
		//Если в куках пусто, показываем форму регистрации
		else if (!currentUid || !currentToken)
		{
			setCreateUserModal(true);
		}
		//В состальных случаях запршиваем данные пользователя с сервера
		else
		{
			getUser()
				.then((user: IUser) => {
					setCurrentUser(user);
					setCurrentUid(getUid());
					setCurrentToken(getToken());
					setCreateUserModal(false);
				});
		}

	}, [currentUid, currentToken, uid, token, setUid]); // linter: setUid ??
	

	/**
	 * Регистрация пользователя
	 * @returns void
	 */
	const careateNewUser = function()
	{
		setErrorUserName('');
		if (userName === '')
		{
			setErrorUserName('Введите имя или псевдоним');
			return;
		}
		setProcessing(true);
		createUser(userName)
			.then((createdUser: IUser) => {

				setCurrentUser(createdUser);
				setRegisterSuccess(true);

				setCurrentUid(createdUser.id);
				setCurrentToken(createdUser.hash as string);
				setCreateUserModal(false);
                setUid(createdUser.id);
				navigate(
					`/user/:id/:hash`.replace(':id', String(createdUser.id)).replace(':hash', String(createdUser.hash))
					);
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(()=>{
				setProcessing(false);
			})
	};



	/**
	 * Создание и копирование ссылки на текущий профиль
	 */
	const copyLinkToClipBoard = function ()
	{
		let linkUrl = `${document.location.protocol}//${document.location.hostname}/todo/user/${currentUid}/${currentToken}`;
		navigator.clipboard.writeText(linkUrl)
		.then(() => {
			console.log('Ссылка на профиль скопирована');
		})
		.catch(err => {
			console.error('Ошибка при копировании ссылки', err);
		});
	};



	return (
		<>
			<div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
						<li className="breadcrumb-item"><Link to='/'>Мои задачи</Link></li>
						<li className="breadcrumb-item active">Пользователь</li>
					</ul>
					<h1 className="page-header mb-0">{currentUser.id ? `Данные пользователя ${currentUser.name ?? ''}` : 'Регистрация'}</h1>
				</div>
				<div className="ms-auto">
					{
						currentUser?.id &&
						<button
							className="btn btn-outline-default text-nowrap btn-sm px-3 rounded-pill"
							onClick={ copyLinkToClipBoard }
							>
							<i className="far fa-copy  me-1 ms-n1"></i> Скопировать ссылку на профиль
						</button>
					}
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					{
						registerSuccess && currentUser?.id &&
						<>
							<div className="alert alert-primary my-3">
								Вы успешно зарегистрированы
							</div>
							
							<div className='text-center py-3'>
								{/* <Link to={`/`} className="btn btn-outline-info">
									Перейти к спискам дел
								</Link> 
								//Todo прокинуть контекст к корневому элементу
								*/}
								<button className="btn btn-outline-info"
									onClick={ () => document.location.replace('/todo/') }
									>Перейти к спискам дел</button>
							</div>
						</>
					}

					{
						currentUser?.id &&
						<>
						<div className="card my-3">
							<div className="card-body">
								<table className="table table-borderless mb-0">
									<tbody>
										<tr>
											<th scope="row">Имя</th>
											<td>{ currentUser.name ?? '' }</td>
										</tr>
										<tr>
											<th scope="row">Email</th>
											<td>{ currentUser.email ?? '' }</td>
										</tr>
										<tr>
											<th scope="row">Зарегисрирован</th>
											<td>{ new Date(currentUser.createdAt).toLocaleString() ?? '' }</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="card-arrow">
								<div className="card-arrow-top-left"></div>
								<div className="card-arrow-top-right"></div>
								<div className="card-arrow-bottom-left"></div>
								<div className="card-arrow-bottom-right"></div>
							</div>
						</div>
						<div className='mt-4' style={{fontSize: '0.9rem'}}>
							<p>
								Добавьте эту страницу в закладки (нажмите сочетание клавиш Ctrl + D), чтобы не потерять ваши записки.
							</p>
							<p>
								Вы так же можете скопировать и отправить ссылку на другие свои устройства, для этого нажмите кнопку "Скопировать ссылку на профиль".
								Или просто сохраните эту ссылку.
							</p>
							<p>
								Обращаем Ваше внимание, при отстутсвии активности в течении года, Ваши данные будут удалены.
							</p>
						</div>
						</>
						
					}
				</div>
			</div>

			{
				createUserModal &&
				<Modal header='Регистрация нового пользователя'
					onOk={careateNewUser}
					processing={processing}
					onCancel={()=>{	document.location.replace('/'); }}>
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
