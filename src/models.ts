export interface IToDo{
    id: number,
    content: string,
    position: number,
    complited: boolean
}

export interface IToDoList{
    id: number|null,
    title: string,
    userId: string|null,
    isActive: boolean,
    items: IToDo[]
}

export interface IToDoCreate{
    id: null,
    content: string,
    position: number,
    complited: boolean
}

export interface IToDoListCreate{
    id: null,
    title: string,
    userId: string|null,
    isActive: boolean,
    items: IToDo[]
}
