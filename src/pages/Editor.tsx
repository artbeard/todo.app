import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { IToDoList } from '../models';
import Store from '../store/Store';

import Card from '../components/card/Card'
import TodoListEditor from '../components/todo/TodoListEditor'

function Editor() {
	const params = useParams();
	let TodoListId: number|null = parseInt(String(params.id));
    //TodoListId = isNaN(TodoListId) ? null : TodoListId;
    
	let TodoList: IToDoList;

	if (!TodoListId)
	{
		TodoListId = null;
		TodoList = {
			id: null,
			title: 'Новый cписок 11',
			userId: null,
			isActive: true,
			items: []
		}
	}
	else
	{
		TodoList = Store.getTodoListById(TodoListId)
	}

    console.log(TodoList, TodoListId, !!TodoListId);

	return (
		<>
			<div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
						<li className="breadcrumb-item"><Link to="/todo/">Мои задачи</Link></li>
						<li className="breadcrumb-item active">{TodoList.title ?? ''}</li>
					</ul>
					<h1 className="page-header mb-0">{TodoList.title ?? ''}</h1>
				</div>
				<div className="ms-auto">
					<button
						className="btn btn-outline-default text-nowrap btn-sm px-3 rounded-pill"
						onClick={e=>{
							window.history.back();
						}}
						>
						<i className="fa fa-arrow-left me-1 ms-n1"></i> Назад
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card header={`Редактирование списка `}>
						<TodoListEditor todoListId={TodoList.id} />
					</Card>
				</div>
			</div>
		</>
	);
}

export default Editor;
