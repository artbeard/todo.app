//import { Link } from 'react-router-dom'
//import { IToDoList } from '../../models';
import TodoProgress from './TodoProgress'
//import TodoItem from './TodoItem';
import TodoListItemEditor from './TodoListItemEditor';

import Store from '../../store/Store';
import { observer } from "mobx-react-lite";

import { IToDoList, IToDoCreate } from '../../models'

interface TodoListEditorProps{
    todoListId: number | null
}

function TodoListEditor({todoListId}: TodoListEditorProps)
{
    console.log('todoListId', todoListId);
    
    let todoList: IToDoList = Store.getTodoListById(todoListId);

    console.log(todoList);

    let completedCount = todoList.items.filter((el) => el?.completed === true).length;
	let totalCount = todoList.items.length;

    return (
        <div className="list-group-item d-flex px-3 px-xl-5">
			<div className="flex-fill pt-2">
				<div className="fw-400 mb-3">
					{todoList.title}
				</div>
				{/* <div className="small text-white text-opacity-50 mb-2">#29930 closed yesterday by Sean</div> */}
				<div className="mb-1">
					{/* <Link to={'/todo/edit/' + todoList.id} className="text-right badge border border-gray-300 text-gray-300 text-decoration-none">Редактировать</Link> */}
					<button className="btn btn-sm btn-outline-default _badge _border _border-gray-300 _text-gray-300">Изменить название</button>
					<span className="btn btn-sm btn-outline-danger _badge _border _border-success _text-success ms-1">Удалить список</span>
				</div>
				<hr className="my-3" />
				<div className="d-flex align-items-center mb-2">
					<div className="fw-400 me-2">
						Задачи ({totalCount}/{completedCount})
					</div>
					<div>
						<button className="btn btn-link text-white text-opacity-50 text-decoration-none">
							<i className="fa fa-plus-circle"></i> Добавить
						</button>
					</div>
					<TodoProgress completed={
						totalCount > 0
							? Math.round(completedCount * 100 / totalCount)
							: 0
						}/>
				</div>
                
                {todoList.items.length > 0 && <ul className="list-group pb-3">
                    {
                        todoList.items.map(todoItem => (
                            <li className="list-group-item list-group-item-action d-flex align-items-center _active _disabled" key={`todo_k${todoItem.id}`}>
                                <TodoListItemEditor todoItem={todoItem} todoListId={todoList.id}  />
                            </li>
                        ))
                    }
                </ul>}
			</div>
		</div>
    )
}

export default observer(TodoListEditor);