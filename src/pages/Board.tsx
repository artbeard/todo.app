import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Store from '../store/Store';
import Card from '../components/card/Card'
import TodoList from '../components/todo/TodoList';
import Modal from '../components/Modal'
import { IToDoList } from '../models';

/**
 * Страница Компонент отрисовки доски со списками
 * @returns JSX
 */
function Board() {

	/**
	 * Отображение окна создяния нового списка
	 */
	const [createModal, setCreateModal] = useState(false);
	/**
	 * Анимация запроса к серверу
	 */
	 const [processing, setProcessing] = useState(false);

	/**
	 * Содержит Заголовок и id списка
	 */
	const [newList, setNewList] = useState({id: null, title: ''});
	/**
	 * Ошибка добавления/редактирования списка
	 */
	const [errorListTitle, setErrorListTitle] = useState('');
	
	let navigate = useNavigate();

	/**
	 * Открытие окна создания нового списка
	 */
	function createNewList()
	{
		setErrorListTitle('');
		setNewList(prev => ({title: `Новый список # ${Store.countTodoList + 1}`, id: null}));
		setCreateModal(true);
	}
	/**
	 * Создание нового списка
	 */
	function okPressed()
	{
		if (newList.title !== '')
		{
			setProcessing(true);
			setErrorListTitle(''); //убираем ошибку
			Store.createNewList(newList.title)
				.then((res: IToDoList)=>{
					//Редирект на редактор=
					navigate(`/todo/edit/${res.id}`);
				})
				.catch(err => {
					//Показать уведомление			
				})
				.finally(()=>{
					setProcessing(false);
					setCreateModal(false);
					setNewList({id: null, title: ''});
				})
		}
		else
		{
			setErrorListTitle('Название списка не может быть пустым');
		}
	}
	return (
		<>
			<div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
						<li className="breadcrumb-item active">Мои задачи</li>
					</ul>
					<h1 className="page-header mb-0">Мои задачи <small>список задач</small></h1>
				</div>
				<div className="ms-auto">
					<button className="btn btn-outline-theme text-decoration-none" onClick={createNewList}>
						<i className="fa fa-plus-circle me-1"></i> Добавить список
					</button>
				</div>
			</div>
			<div className="mb-md-4 mb-3 d-md-flex">
				<div className="ms-md-4 mt-md-0 mt-2"><i className="fa fa-list me-1 text-theme"></i> {Store.countTodoList} Списоков</div>
				<div className="ms-md-4 mt-md-0 mt-2"><i className="fa fa-check me-1 text-theme"></i> {Store.countTodoListCompleted} Выполненных</div>
				{/* <div className="ms-md-4 mt-md-0 mt-2"><i className="fa fa-code-branch me-1 text-theme"></i> 3 Отслеживаемых</div> */}
			</div>
			<div className="row">
				{
					Store.countTodoList === 0 &&
                    <div className='col-12'>
						Нет данных для отображения
					</div>
				}
				{
					Store.todoList.map((list, index) => {
						return (
							<div className='col-12 col-md-6' key={`card_wrap_${index}`}>
								<Card header={list.title}>
									<TodoList todoList={list} />
								</Card>
							</div>
						)
					})
				}
			</div>
			{
				createModal &&
				<Modal header='Создать новый список'
					onOk={okPressed}
					processing={processing}
					onCancel={()=>{setCreateModal(false)}}>
					<form className="row"
						onSubmit={(e) => {e.preventDefault(); okPressed();}}
						>
						<div className="form-group mb-3">
							<label className="form-label">Введите название списка</label>
							<input type="text"
								className={'form-control' + (errorListTitle !== '' ? ' is-invalid' : '')}
								value={newList.title}
								onChange={(e) => {setNewList(prev => ({...prev, title: e.target.value}))}}
								/>
								{errorListTitle && <div className="invalid-feedback">{errorListTitle}</div>}
						</div>
					</form>
				</Modal>
			}
		</>
	);
}

export default observer(Board);
