import {makeAutoObservable} from 'mobx'
import {IToDo, IToDoList} from '../models'

class Store{

    todoList: IToDoList[] = [];

    constructor()
    {
        makeAutoObservable(this);
    }

    async init()
    {
        await fetch('/data/store.js')
            .then(response => response.json())
            .then((data:IToDoList[]) => {
                this.todoList = data;
                this.setTodoList(data);
            });
    }

    setTodoList(todoList: IToDoList[])
    {
        this.todoList = todoList;
    }

    //Колчиество списков
    get countTodoList(): number
    {
        return this.todoList.length;
    }

    //Количество Выполненных списков
    get countTodoListCompleted(): number
    {
        return this.todoList.reduce((acc, elem) => {
            if (elem.items.filter(itemEl => itemEl.completed).length === elem.items.length)
            {
                return acc + 1;
            }
            return acc;
        }, 0);
    }

    //Поиск списка по id
    getTodoListById(id: number): any //IToDoList
    {
        return this.todoList.find(el => el.id === id)
    }

    //Изменить completed у переданного todo
    async setCompleted(item: IToDo, completed: boolean)
    {
        new Promise((resolve, reject) => {
            setTimeout(()=>{
                item.completed = completed;
                resolve(true);
            }, 1500 );
        })
    }
    
}

export default new Store()
