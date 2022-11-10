import { Link } from 'react-router-dom'
import { IToDoList } from '../../models';
import TodoProgress from './TodoProgress'
import TodoItem from './TodoItem';

//import Store from '../../store/Store';
import { observer } from "mobx-react-lite";

import { IToDoListCreate, IToDoCreate } from '../../models'

interface TodoListEditorProps{
    todoListId: number | null
}

function TodoListEditor({todoListId}: TodoListEditorProps)
{
    const todoList: IToDoListCreate = {
        id: null,
        title: `Новый список дел`,
        items: [],
        userId: null,
        isActive: true
    };

    let completedCount = todoList.items.filter((el) => el?.completed === true).length;
	let totalCount = todoList.items.length;
    return (
        <div className="list-group-item d-flex px-3 px-xl-5">
			{/* <div className="me-3 pt-1">
				<i className={'fa-fw fa-lg ' + (completedCount === totalCount 
					? 'far fa-check-circle text-success'
					: 'fas fa-tasks text-default'
					)}></i>
			</div> */}
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
						<button className="btn btn-link text-white text-opacity-50 text-decoration-none">
							<i className="fa fa-plus-circle"></i> Добавить
						</button>
					</div>
					<TodoProgress completed={
						totalCount > 0
							? Math.round(completedCount * 100 / totalCount)
							: 0
						} />
				</div>
                
                <ul className="list-group">
                    <li className="list-group-item list-group-item-action _active">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control "  />
                            <button className="btn btn-outline-secondary" type="button"
                                
                                >
                                <i className="fas fa-check mx-0 mx-md-2 "></i>
                            </button>
                            <button className="btn btn-outline-secondary" type="button" 
                                
                                >
                                <i className="fas fa-redo-alt mx-0 mx-md-2 "></i>
                            </button>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="form-check my-1 position-relative todoItem">
                			<input type="checkbox" className="form-check-input" />
                			<label className="form-check-label" htmlFor={`item_`} >Некоторый текст Некоторый текст Некоторый текст Некоторый текст </label>
                            <div className='position-absolute actionTodoItemButtons'>
                                <i className="fas mx-2 fa-times"></i>
                                <i className="fas mx-2 fa-pencil-alt"></i>
                            </div>
                		</div>
                    </li>
                    <li  className="list-group-item list-group-item-action">
                            <input type="checkbox"                                
                                className="form-check-input"
                                />
                        <span className='ps-1'>Morbi leo risus</span>
                        </li>
                    <li  className="list-group-item list-group-item-action">Porta ac consectetur ac</li>
                    <li  className="list-group-item list-group-item-action _disabled">
                        <div className="form-check mb-2px d-flex align-items-center">
                			<input type="checkbox"                                
                                className="form-check-input"
                                 />
                			<label className="form-check-label _small flex-fill" htmlFor={`item_`} >Некоторый текст Некоторый текст Некоторый текст Некоторый текст Некоторый текст</label>
                            
                        </div>
                        
                    </li>
                </ul>
                        <br />
                <div className="list-group">
                    <div className="list-group-item list-group-item-action _active">Cras justo odio</div>
                    <div className="list-group-item list-group-item-action">Dapibus ac facilisis in</div>
                    <div  className="list-group-item list-group-item-action">Morbi leo risus</div>
                    <div  className="list-group-item list-group-item-action">Porta ac consectetur ac</div>
                    <div  className="list-group-item list-group-item-action _disabled">Vestibulum at eros</div>
                </div>
				<div className="form-group mb-1">
					
						{
							// todoList.items
							// //	.sort((a, b) => {return  a.position - b.position })
							// 	.map((item)=>{
							// 	return (
							// 		<TodoItem item={item} todoListID={todoList.id} key={`TodoListItem_${todoList.id}_${item.id}`} />
							// 	)
							// }) 
						}
					fd
				</div>
			</div>
		</div>
    )
}

export default observer(TodoListEditor);