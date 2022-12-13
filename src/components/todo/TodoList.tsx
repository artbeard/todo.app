import { Link } from 'react-router-dom'
import { IToDoList } from '../../models';
import TodoProgress from './TodoProgress'
import TodoItem from './TodoItem';

import { observer } from "mobx-react-lite";

interface ITodoListProps{
	todoList: IToDoList
}
/**
 * Карточка отображения списка дел на доске
 * @param ITodoListProps
 * @returns JSX
 */
function TodoList({todoList}: ITodoListProps)
{
	/**
	 * Количество выполненных пунктов
	 */
	let completedCount = todoList.items.filter(el => el.completed === true).length;
	/**
	 * Количество пунктов всего
	 */
	let totalCount = todoList.items.length;
	return (
		<div className="list-group-item d-flex px-3 py-3">
			<div className="me-3 pt-1">
				<i className={'fa-fw fa-lg ' + (completedCount === totalCount 
					? 'far fa-check-circle text-success'
					: 'fas fa-tasks text-default'
					)}></i>
			</div>
			<div className="flex-fill">
				<div className="d-flex align-items-center mb-2 mt-1">
					<div className="fw-400 me-2">
						Задачи ({totalCount}/{completedCount})
					</div>
					<div>
						<Link to={`/todo/edit/${todoList.id}`} className="text-white text-opacity-50 text-decoration-none">
							<i className="far fa-edit"></i> Редактировать
						</Link>
					</div>
					<TodoProgress completed={
						totalCount > 0
							? Math.round(completedCount * 100 / totalCount)
							: 0
						} />
				</div>
				<hr className="my-3" />
				<div className="form-group mb-1">
					<div className="collapse show">
						{
							todoList.items
								.map((item)=>{
								return (
									<TodoItem item={item} todoListID={todoList.id} key={`TodoListItem_${todoList.id}_${item.id}`} />
								)
							}) 
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(TodoList);