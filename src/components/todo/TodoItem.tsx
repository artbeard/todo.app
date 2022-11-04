import {IToDo} from '../../models'
import Store from '../../store/Store'
import { observer } from "mobx-react-lite";

interface ITodoItemProps{
    item: IToDo,
    todoListID: number|null
}

function TodoItem({item, todoListID}: ITodoItemProps)
{
    return(
        <div className="form-check mb-2px">
			<input type="checkbox"
                checked={item.complited}
                onChange={(e)=>{
                    //TodoManager.changeComplited(item.id, e.target.checked, toDoListID)
                    //Store.getTodoListById(todoListID).items.find((el:IToDo) => {return el.id === item.id}).complited = e.target.checked;
                    Store.setComplited(item, e.target.checked);
                }}
                className="form-check-input"
                id={`item_${item.id}`} />
			<label className="form-check-label small" htmlFor={`item_${item.id}`} >{item.content}</label>
		</div>
    )
}

export default observer(TodoItem);
