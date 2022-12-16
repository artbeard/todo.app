import { runInAction, makeAutoObservable } from 'mobx'
import { IToDo, IToDoList } from '../use/models'
import { NotFoundError } from '../use/errors';

const apiPoints = {
	todoList: `/api/todo/list`, //GET получение массива списков, POST создание нового списка
	editTodoList: `/api/todo/list/:list_id`, //Изменение / удаление списка

	addTodoItem: `/api/todo/item/in/:list_id`, //post Создание элемента списка
	editTodoItem: `/api/todo/item/:item_id`, //Изменение/удаление элемента списка
	todoItemComplete: `/api/todo/item/:item_id/complete`, //Отметка выполнения/невыполнеия дела
	
}

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
		return fetch(apiPoints.todoList)
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
		todoList.forEach((todo) => {
			todo.items.sort((a: IToDo, b: IToDo) => { return a.position - b.position })
		})
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
			throw new NotFoundError('Список не найден');
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
	async createNewTodoItem(item: IToDo, todoId: number): Promise<any>
	{
		let todo = this.getTodoListById(todoId) as IToDoList;
		item.position = todo.items.reduce((acc: number, el: IToDo):number => { return el.position > acc ? el.position : acc }, 0) + 10;
		
		return fetch(apiPoints.addTodoItem.replace(':list_id', String(todoId)), {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(item)
		  	})
			.then(response => response.json())
			.then((data:{id: number}) => {
				console.log('Результат', data);
				item.id = data.id;
				runInAction(()=>{
					todo?.items.push(item)
				});
			})
			.catch((err)=>{
				console.log('Ошибка добавления', err)
			});
	}

	/**
	 * Запрос к серверну на обновление переданного элемента
	 * @param item IToDo
	 * @param todoId number
	 * @returns Promise<boolean>
	 */
	async updateTodoItem(item: IToDo, todoId: number): Promise<boolean>
	{
		let todo = this.getTodoListById(todoId) as IToDoList;
		let index = todo.items.findIndex((el: IToDo) => el.id === item.id);
		
		return new Promise((resolve, reject) => {
			fetch(apiPoints.editTodoItem.replace(':item_id', String(item.id)), {
				method: 'PUT',
				headers: {
				  'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify({content: item.content})
			})
			.then(response => {
				if (response.status === 200)
				{
					runInAction(()=>{
						todo.items[index] = item;
					});
					resolve(true);
				}
				else
				{
					reject(false);
				}
			})
			.catch((err)=>{
				console.log('Ошибка изменения контента', err)
				reject(false);
			});
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
		runInAction(()=>{
			item.completed = completed;
		});
		return new Promise((resolve, reject) => {
			fetch(apiPoints.todoItemComplete.replace(':item_id', String(item.id)), {
				method: 'PATCH',
				headers: {
				  'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify({completed: completed})
			})
			.then(response => {
				if (response.status === 200)
				{
					resolve(true);
				}
				else
				{
					//Откат назад
					runInAction(()=>{
						item.completed = !completed;
					});
					reject(false);
				}
			})
			.catch((err)=>{
				//Откат назад
				runInAction(()=>{
					item.completed = !completed;
				});
				console.log('Ошибка set completed', err)
				reject(false);
			});
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
		return new Promise((resolve, reject) => {
			fetch(apiPoints.editTodoItem.replace(':item_id', String(item.id)), {
				method: 'DELETE',
				headers: {
				  'Content-Type': 'application/json;charset=utf-8'
				},
			})
			.then(response => {
				if (response.status === 200)
				{
					runInAction(()=>{
						List.items = List.items.filter((el:IToDo) => !(el.id === item.id))
					})
					resolve(true);
				}
				else
				{
					reject(false);
				}
			})
			.catch((err)=>{
				console.log('Ошибка set completed', err)
				reject(false);
			});
		})
	}
	
}

export default new Store()
