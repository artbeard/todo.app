import {runInAction, makeAutoObservable} from 'mobx'
import {IToDo, IToDoList} from '../models'

class Store{

    todoList: IToDoList[] = [];

    constructor()
    {
        makeAutoObservable(this);
    }

    async init()
    {
        return await fetch('/data/store.js')
            .then(response => response.json())
            .then((data:IToDoList[]) => {
                runInAction(()=>{
                    this.todoList = data;
                    this.setTodoList(data);
                })
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
    getTodoListById(id: number | null): any //IToDoList
    {
        return this.todoList.find(el => el.id === id)
    }
    addTodoList(newList: IToDoList)
    {
        this.todoList.push(newList);
        // this.todoList = [
        //     ...this.todoList,
        //     newList
        // ];
    }

    /**
     * создание нового списка дел
     * @param title 
     * @returns 
     */
    async createNewList(title: string):Promise<IToDoList>
    {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                let newEl:IToDoList = {
                    id: 533,
                    title: title,
                    userId: 133,
                    isActive: true,
                    items: []
                };
                this.addTodoList(newEl);
                resolve(
                    this.getTodoListById(newEl.id)
                );
            }, 1500 );
        })
    }

    // insertItem(item: IToDo, todoList: IToDoList) {
    //     todoList.items.push(item)
    // }

    /**
     * Создание новго пункта в списке
     * @param item 
     * @returns 
     */
    async createNewTodoItem(item: IToDo, todoId: number)//:Promise<IToDoList>
    {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                item.id = Math.round(Math.random()*1000);
                let todo = this.getTodoListById(todoId);
                item.position = todo.items.reduce((acc: number, item: IToDo) => Math.max(acc, item.position), 0) + 10;
                runInAction(()=>{
                    todo.items.push(item)
                });
                resolve(item);
            }, 1500 );
        })
    }

    async updateTodoItem(item: IToDo, todoId: number)//:Promise<IToDoList>
    {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                let todo = this.getTodoListById(todoId);
                let index = todo.items.findIndex((el: IToDo) => el.id === item.id);
                runInAction(()=>{
                    todo.items[index] = item;
                });
                resolve(true);
            }, 1500 );
        })
    }

    /**
     * Изменить completed у переданного todo
     * @param item 
     * @param completed 
     */
    async setCompleted(item: IToDo, completed: boolean)
    {
        new Promise((resolve, reject) => {
            //setTimeout(()=>{
                item.completed = completed;
                resolve(true);
            //}, 1500 );
        })
    }

    /**
     * Удаление элемента из списка дел
     * @param item 
     * @param listId 
     */
    async removeTodo(item: IToDo, listId: number | null)
    {
        let List = this.getTodoListById(listId);
        List.items = List.items.filter((el:IToDo) => !(el.id === item.id))
        new Promise((resolve, reject) => {
            //setTimeout(()=>{
                //item;
                resolve(item);
            //}, 1500 );
        })
    }
    
}

export default new Store()
