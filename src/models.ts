export interface IToDo{
    id: number,
    content: string,
    position: number,
    complited: boolean
}

export interface IToDoList{
    id: number,
    title: string,
    userId: string,
    isActive: boolean,
    items: IToDo[]
}
