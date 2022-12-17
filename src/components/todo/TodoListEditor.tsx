import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TodoProgress from './TodoProgress'
import TodoListItemEditor from './TodoListItemEditor';
import Modal from '../Modal';
import Store from '../../store/Store';
import { IToDoList, IToDo, toDoNullObject } from '../../use/models'

interface ITodoListEditorProps{
	todoListId: number | null
}

/**
 * Отображает список дел, позволяет добавить/удалить/переименовать позиции в списке, 
 * а так же удалить/переименовать сам список
 * @param ITodoListEditorProps
 * @returns 
 */
function TodoListEditor({todoListId}: ITodoListEditorProps)
{
	let navigate = useNavigate();
	
	/**
	 * Собственно, список дел
	 */
	let todoList: IToDoList = Store.getTodoListById(todoListId) as IToDoList;
	/**
	 * Выполнено пунктов
	 */
	let completedCount = todoList.items.filter((el) => el?.completed === true).length;
	/**
	 * Всего пунктов
	 */
	let totalCount = todoList.items.length;
	/**
	 * Элемент списка дел
	 */
	const [todoItem, setTodoItem] = useState(toDoNullObject);

	/**
	 * Стейт формы для изменения заголовка
	 */
	const [todoTitle, setTodoTitle] = useState('');
	/**
	 * Анимация запроса к серверу
	 */
	const [processing, setProcessing] = useState(false);



	/**
	 * Ошибка при редактировании названия пункта
	 */
	const [todoItemError, setTodoItemError] = useState('');
	/**
	 * Ошибка изменения заголовка
	 */
	const [todoTitleError, setTodoTitleError] = useState('');
	


	/**
	 * Отображение окна создяния нового пункта
	 */
	const [addItemModal, setAddItemModal] = useState(false);
	/**
	 * Отображение окна с подтверждением удаления списка
	 */
	const [delModal, setDelModal] = useState(false);
	/**
	 * Отображение окна редактирования заголовка
	 */
	const [changeTodoTitleModal, setChangeTodoTitleModal] = useState(false);



	/**
	 * Открыть модальное окно для создания новго элемента
	 */
	const createNewItem = function()
	{
		setProcessing(false);
		setTodoItemError('');
		setTodoItem({
			id: null,
			content: '',
			position: 0,
			completed: false
		});
		setAddItemModal(true);
	}
	 /**
	  * Открыть модальное окно для редактирования
	  * @param todoItem 
	  */
	const changeItem = function(todoItem: IToDo){
		setProcessing(false);
		setTodoItemError('');
		setTodoItem(todoItem);
		setAddItemModal(true);
	}
	 
	/**
	* Сохранение в store 
	* @returns 
	*/
	const saveItemToStore = function()
	{
		if (!todoItem.content)
		{
			setTodoItemError('Текст пункта не может быть пустым');
			return;
		}
		setTodoItemError('');
		setProcessing(true);
		let storeRequest = todoItem.id === null
			? Store.createNewTodoItem(todoItem, todoList.id as number)
			: Store.updateTodoItem(todoItem, todoList.id as number);
		storeRequest
			.then((res)=>{
				//ок
			})
			.catch(err => {
				console.log(err);
			})
			.finally(()=>{
				setProcessing(false);
				setAddItemModal(false);
			})
	}

	/**
	 * Удаление списка дел
	 * @param todoList 
	 */
	const deleteTodoList = function(todoList: IToDoList){
		setProcessing(true);
		Store.removeList(todoList.id as number)
			.then(()=>{
				//возврат на доску
				navigate(`/`);
			})
			.finally(()=>{
				setProcessing(false);
			})
	}
	
	/**
	 * Изменение заголовка
	 */
	const changeTodoTitle = function()
	{
		setTodoTitleError('');
		if (todoTitle === '')
		{
			setTodoTitleError('Заголовок списка не может быть пустым');
		}
		else if (todoTitle === todoList.title)
		{
			setChangeTodoTitleModal(false);
		}
		else
		{
			setProcessing(true);
			Store.changeListTilte(todoList.id as number, todoTitle)
				.then((res)=>{
					console.log('изменили название', res);
				})
				.finally(()=>{
					setProcessing(false);
					setChangeTodoTitleModal(false);
				});
		}
	}

	return (
		<div className="list-group-item d-flex px-3 px-xl-5">
			<div className="flex-fill pt-2">
				<div className="mb-1">
					<button className="btn btn-sm btn-outline-default"
						onClick={()=>{setTodoTitle(todoList.title); setChangeTodoTitleModal(true);}}
						><i className="far fa-edit"></i> <b>Изменить название</b></button>
					<span className="btn btn-sm btn-outline-danger ms-1 ms-md-3"
						onClick={()=>setDelModal(true)}
						><i className="fa fa-trash"></i> <b>Удалить список</b></span>
				</div>
				<hr className="my-3" />
				<div className="d-flex align-items-center mb-2">
					<div className="fw-400 me-2">
						Задачи ({totalCount}/{completedCount})
					</div>
					<div>
						<button className="btn btn-link text-white text-opacity-50 text-decoration-none"
							onClick={createNewItem}>
							<i className="fa fa-plus-circle"></i> Добавить
						</button>
					</div>
					<TodoProgress completed={
						totalCount > 0
							? Math.round(completedCount * 100 / totalCount)
							: 0
						}/>
				</div>
				
				{
					todoList.items.length > 0 &&
					<ul className="list-group pb-3">
					{
						todoList.items.map(todoItem => (
							<li className="list-group-item list-group-item-action d-flex align-items-center _active _disabled" key={`todo_k${todoItem.id}`}>
								<TodoListItemEditor
									todoItem={todoItem}
									todoListId={todoList.id}
									changeItem={changeItem}
									/>
							</li>
						))
					}
					</ul>
				}
				{
					addItemModal &&
					<Modal header={todoItem.id == null ? 'Создать новое дело' : `Редактирование дела #${todoItem.id}`}
						onOk={() => saveItemToStore()}
						processing={processing}
						onCancel={()=>{setAddItemModal(false)}}>
						<form className="row"
							onSubmit={(e) => {e.preventDefault(); saveItemToStore();}}
							>
							<div className="form-group mb-3">
								<label className="form-label">Текст пункта</label>
								<input type="text"
									className={'form-control' + (todoItemError !== '' ? ' is-invalid' : '')}
									value={todoItem.content}
									onChange={(e) => { setTodoItem(prev => ({...prev, content: e.target.value})) }}
									/>
									{todoItemError && <div className="invalid-feedback">{todoItemError}</div>}
							</div>
						</form>
					</Modal>
				}
				{
					delModal && 
					<Modal header={`Подтверждение удаления`}
						onOk={() => deleteTodoList(todoList)}
						processing={processing}
						onCancel={()=>{setDelModal(false)}}>
						<div className="text-center my-3">
							Вы действительно хотите удалить список "{todoList.title}"?
							<br />
							Это действие нельзя будет отменить.
						</div>
					</Modal>
				}
				{
					changeTodoTitleModal &&
					<Modal header='Изменить название списка'
						onOk={changeTodoTitle}
						processing={processing}
						onCancel={()=>{setChangeTodoTitleModal(false)}}>
						<form className="row"
							onSubmit={(e) => {e.preventDefault(); changeTodoTitle();}}
							>
							<div className="form-group mb-3">
								<label className="form-label">Введите новое название списка</label>
								<input type="text"
									className={'form-control' + (todoTitleError !== '' ? ' is-invalid' : '')}
									value={todoTitle}
									onChange={(e) => {setTodoTitle(e.target.value)}}
									/>
									{todoTitleError && <div className="invalid-feedback">{todoTitleError}</div>}
							</div>
						</form>
					</Modal>
				}
			</div>
		</div>
	)
}

export default observer(TodoListEditor);