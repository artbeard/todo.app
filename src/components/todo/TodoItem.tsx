import {IToDo} from '../../models'

interface ITodoItemProps{
    item: IToDo,
    todoListID: number
}

function TodoItem({item, todoListID}: ITodoItemProps)
{
    return(
        <div className="form-check mb-2px">
			<input type="checkbox"
                checked={item.complited}
                onChange={(e)=>{
                    //TodoManager.changeComplited(item.id, e.target.checked, toDoListID)
                }}
                className="form-check-input"
                id={`item_${item.id}`} />
			<label className="form-check-label small" htmlFor={`item_${item.id}`} >{item.content}</label>
		</div>
    )
}

export default TodoItem;
