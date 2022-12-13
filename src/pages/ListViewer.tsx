import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { IToDoList } from '../models';
import Store from '../store/Store';
import { observer } from "mobx-react-lite";
import Card from '../components/card/Card'
import TodoListEditor from '../components/todo/TodoListEditor'

/**
 * Страница Просмотр содержимого списка
 * @returns JSX
 */
function ListViewer() {
	const params = useParams();
    const navigate = useNavigate();
	/**
     * Id списка дел, получаем из роута
     */
    let TodoListId: number|null = parseInt(String(params.id));
    
	let TodoList: IToDoList = Store.getTodoListById(TodoListId);

    useEffect(() => {
        //Редиректим на страницу ошибки, если требуемый список не найден
        if (!TodoList)
        {
            navigate(`/todo/error/404`);
        }
    })
    
	return (
		<>
			<div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
						<li className="breadcrumb-item"><Link to="/todo/">Мои задачи</Link></li>
						<li className="breadcrumb-item active">{TodoList?.title ?? ''}</li>
					</ul>
					<h1 className="page-header mb-0">{TodoList?.title ?? ''}</h1>
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
                    {TodoList &&
                        <Card header={`Редактирование списка `}>
    						<TodoListEditor todoListId={TodoList.id} />
    					</Card>
                    }
				</div>
			</div>
		</>
	);
}

export default observer(ListViewer);
