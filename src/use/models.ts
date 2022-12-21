export interface IToDo{
    id: number|null,
    content: string,
    position: number,
    completed: boolean
}

export const toDoNullObject: IToDo = {
    id: null,
    content: '',
    position: 0,
    completed: false
}

export interface IToDoList{
    id: number|null,
    title: string,
    userId: number|null,
    isActive: boolean,
    items: IToDo[]
}

export const toDoListNullObject: IToDoList = {
    id: null,
    title: '',
    userId: null,
    isActive: true,
    items: []
}

export interface IUser{
    id: number,
	name: string,
	password: string | null
	email: string | null
	createdAt: Date, 
	lastActive: Date, 
	isActive: boolean,
	hash: string | null
}