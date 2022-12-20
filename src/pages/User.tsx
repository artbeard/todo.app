import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUser, setUser, createUser } from '../use/getUser';
//import { observer } from "mobx-react-lite";
//import Store from '../store/Store';
//import Card from '../components/card/Card'
//import TodoListEditor from '../components/todo/TodoListEditor'
// import { 
//     //IToDoList,
//     toDoListNullObject } from '../use/models';
//import { NotFoundError } from '../use/errors';
import Modal from '../components/Modal';

/**
 * Страница Просмотр содержимого списка
 * @returns JSX
 */
function User() {

	const [createUserModal, setCreateUserModal] = useState(false);
	const [userName, setUserName] = useState('');
	const [errorUserName, setErrorUserName] = useState('');
	const [processing, setProcessing] = useState(false);
	

	const params = useParams();
	let currentUser: string | undefined = getUser();
	let uid: string | undefined = params?.uid ?? undefined;
	

	const careateNewUser = function() {
		setErrorUserName('');
		if (userName == '')
		{
			setErrorUserName('Введите имя или псевдоним');
			return;
		}
		setProcessing(true);
		createUser(userName)
			.then(res => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(()=>{
				setProcessing(false);
			})
	};


	useEffect(()=>{
		
		if (currentUser === undefined && uid === undefined)
		{
			console.log(currentUser, uid, 'На регистрацию');
			setCreateUserModal(true);
		}
		else if (currentUser !== undefined && uid === undefined)
		{
			console.log(currentUser, uid, 'На редирект /user/uid');
		}
		else if (currentUser === undefined && uid !== undefined)
		{
			console.log(currentUser, uid, 'Установить текущего пользователя(Сделать подверждение)');
		}
		else if (currentUser !== undefined && uid !== undefined && currentUser !== uid)
		{
			console.log(currentUser, uid, 'Уведомление о презаписи');
		}

	}, [currentUser, uid]);
	

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
