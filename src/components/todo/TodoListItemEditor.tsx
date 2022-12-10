import { observer } from 'mobx-react-lite'
import DropDown from '../DropDown';
import {IToDo} from '../../models'
import Store from '../../store/Store';

interface ITodoItemProps{
	todoItem: IToDo,
	todoListId: number | null,
	changeItem: Function
}

function TodoListItemEditor({todoItem, todoListId, changeItem}: ITodoItemProps)
{
	return (
		<>
			<div className="form-check my-1 flex-fill">
				<input type="checkbox" className="form-check-input"
					id={`item_id${todoItem.id}`}
					checked={todoItem.completed}
					onChange={e => {Store.setCompleted(todoItem, e.target.checked)}}
					/>
				<label className="form-check-label"
					htmlFor={`item_id${todoItem.id}`}>{todoItem.content}</label>
			</div>
			<DropDown>
				<button className="btn btn-sm btn-link btn-outline dropdown-item"
					onClick={() => {changeItem(todoItem)} }
                    >Редактировать</button>
				<button className="btn btn-sm btn-link btn-outline dropdown-item"
					onClick={() => {Store.removeTodo(todoItem, todoListId)}}
					>Удалить</button>
			</DropDown>
		</>
	)
}

export default observer(TodoListItemEditor);