import { Link } from 'react-router-dom'
import { IToDoList } from '../../models';
import TodoProgress from './TodoProgress'
import TodoItem from './TodoItem';

//import Store from '../../store/Store';
import { observer } from "mobx-react-lite";

interface TodoListProps{
    todoList: IToDoList
}

function TodoList({todoList}: TodoListProps)
{
    let completedCount = todoList.items.filter(el => el.completed === true).length;
	let totalCount = todoList.items.length;
    return (
        <div className="list-group-item d-flex px-3">
			<div className="me-3 pt-1">
				<i className={'fa-fw fa-lg ' + (completedCount === totalCount 
					? 'far fa-check-circle text-success'
					: 'fas fa-tasks text-default'
					)}></i>
			</div>
			<div className="flex-fill">
				<div className="fw-400 mb-2">
					{todoList.title}
				</div>
				{/* <div className="small text-white text-opacity-50 mb-2">#29930 closed yesterday by Sean</div> */}
				<div className="mb-1">
					{/* <Link to={'/todo/edit/' + todoList.id} className="text-right badge border border-gray-300 text-gray-300 text-decoration-none">Редактировать</Link> */}
					{/* <span className="badge border border-gray-300 text-gray-300">Скопировать ссылку</span>
					<span className="badge border border-success text-success">Удалить</span> */}
				</div>
				<hr className="my-3" />
				<div className="d-flex align-items-center mb-2">
					<div className="fw-400 me-2">
						Задачи ({totalCount}/{completedCount})
					</div>
					<div>
						<Link to={`/todo/edit/${todoList.id}`} className="text-white text-opacity-50 text-decoration-none">
							<i className="fa fa-plus-circle"></i> Добавить
						</Link>
					</div>
					<TodoProgress completed={
						totalCount > 0
							? Math.round(completedCount * 100 / totalCount)
							: 0
						} />
				</div>
				<div className="form-group mb-1">
					<div className="collapse show">
						{
							todoList.items
							//	.sort((a, b) => {return  a.position - b.position })
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