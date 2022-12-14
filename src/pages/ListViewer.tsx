import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Store from '../store/Store';
import Card from '../components/card/Card'
import TodoListEditor from '../components/todo/TodoListEditor'
import { 
    //IToDoList,
    toDoListNullObject } from '../models';
import { NotFoundError } from '../use/errors';
/**
 * Страница Просмотр содержимого списка
 * @returns JSX
 */
function ListViewer() {
	const params = useParams();
    const navigate = useNavigate();
	//По умолчанию nullObject
    const [todoList, setTodoList] = useState(toDoListNullObject)
    
    useEffect(() => {
        //Id списка дел, получаем из роута
        let TodoListId: number = parseInt(params.id as string);
        try
        {
            setTodoList( Store.getTodoListById(TodoListId) );
        }
        catch (e)
        {
            if (e instanceof NotFoundError)
            {
                navigate(`/todo/error/404`);
            }
            else
            {
                throw e;
            }
        }
    }, [params.id, navigate])
    
	return (
		<>
			<div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
						<li className="breadcrumb-item"><Link to="/todo/">Мои задачи</Link></li>
						<li className="breadcrumb-item active">{todoList?.title ?? ''}</li>
					</ul>
					<h1 className="page-header mb-0">{todoList?.title ?? ''}</h1>
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
                    {todoList.id !== null &&
                        <Card header={`Редактирование списка `}>
    						<TodoListEditor todoListId={todoList.id} />
    					</Card>
                    }
				</div>
			</div>
		</>
	);
}

export default observer(ListViewer);
