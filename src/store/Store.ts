import {runInAction, makeAutoObservable} from 'mobx'
import {IToDo, IToDoList} from '../models'

class Store{

	/**
	 * Стейт - массив списков дел
	 */
	todoList: IToDoList[] = [];

	constructor()
	{
		makeAutoObservable(this);
	}

	/**
	 * Загрузка данных с сервера
	 * @returns 
	 */
	async init()
	{
		return fetch('/data/store.js')
			.then(response => response.json())
			.then((data:IToDoList[]) => {
				runInAction(()=>{
					this.setTodoList(data);
				})
			});
	}

	/**
	 * Устанавливает массив списков
	 * @param todoList IToDoList[]
	 */
	setTodoList(todoList: IToDoList[])
	{
		this.todoList = todoList;
	}

	/**
	 * возвращает количество списков 
	 */
	get countTodoList(): number
	{
		return this.todoList.length;
	}

	/**
	 * Возвращает количество Выполненных списков
	 */
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

	/**
	 * Поиск списка по id
	 * @param id number | null
	 * @returns IToDoList
	 */
	getTodoListById(id: number | null): IToDoList
	{
		let result = undefined;
		if (null !== id && !isNaN(id))
		{
			result = this.todoList.find(el => el.id === id);
		}
		if (result === undefined)
			throw new Error('Список не найден');
		return result;
	}

	/**
	 * Добавляет в массив новый список дел
	 * @param newList 
	 */
	addTodoList(newList: IToDoList): void
	{
		this.todoList.push(newList);
	}

	/**
	 * Запрос к серверу на создание нового списка дел
	 * @param title string
	 * @returns Promise<IToDoList>
	 */
	async createNewList(title: string): Promise<IToDoList>
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
					this.getTodoListById(newEl.id) as IToDoList
				);
			}, 1500 );
		})
	}

	/**
	 * Запрос к серверу на удаление списка дел
	 * @param id number
	 * @returns Promise<boolean>
	 */
	async removeList(id: number): Promise<boolean>
	{
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				runInAction(()=>{
					let index = this.todoList.findIndex(el => el.id === id);
					if (index > -1)
					{
						this.todoList.splice(index, 1);
						resolve(true);
					}
					else
					{
						reject(false);
					}
				});
				
			}, 1500 );
		})
	}

	/**
	 * Запрос к серверу на изменение названия списка дел
	 * @param id number
	 * @param title string
	 * @returns Promise<IToDoList>
	 */
	async changeListTilte(id: number, title: string): Promise<IToDoList>
	{
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				runInAction(()=>{
					let changingToDo: IToDoList = this.getTodoListById(id) as IToDoList;
					changingToDo.title = title;
					resolve(changingToDo);
				});
			}, 1500 );
		})
	}



	/**
	 * Запрос к серверу на создание нового списка дел
	 * @param item IToDo
	 * @param todoId number
	 * @returns 
	 */
	async createNewTodoItem(item: IToDo, todoId: number): Promise<IToDo>
	{
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				item.id = Math.round(Math.random()*1000);
				let todo = this.getTodoListById(todoId) as IToDoList;
				item.position = todo.items.reduce((acc: number, item: IToDo) => Math.max(acc, item.position), 0) + 10;
				runInAction(()=>{
					todo?.items.push(item)
				});
				resolve(item);
			}, 1500 );
		})
	}

	/**
	 * Запрос к серверну на обновление переданного элемента
	 * @param item IToDo
	 * @param todoId number
	 * @returns Promise<boolean>
	 */
	async updateTodoItem(item: IToDo, todoId: number): Promise<boolean>
	{
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				let todo = this.getTodoListById(todoId) as IToDoList;
				let index = todo.items.findIndex((el: IToDo) => el.id === item.id);
				runInAction(()=>{
					todo.items[index] = item;
				});
				resolve(true);
			}, 1500 );
		})
	}

	/**
	 * Запрос к серверу на изменение состояние у элемента списка
	 * @param item IToDo
	 * @param completed boolean
	 * @return Promise<boolean>
	 */
	async setCompleted(item: IToDo, completed: boolean): Promise<boolean>
	{
		return new Promise((resolve, reject) => {
			//setTimeout(()=>{
				item.completed = completed;
				resolve(true);
			//}, 1500 );
		})
	}

	/**
	 * Запрос к серверу на удаление списка дел
	 * @param item IToDo
	 * @param listId number
	 * @returns Promise<boolean>
	 */
	async removeTodoItem(item: IToDo, listId: number | null): Promise<boolean>
	{
		let List = this.getTodoListById(listId) as IToDoList;
		List.items = List.items.filter((el:IToDo) => !(el.id === item.id))
		return new Promise((resolve, reject) => {
			//setTimeout(()=>{
				//item;
				resolve(true);
			//}, 1500 );
		})
	}
	
}

export default new Store()
