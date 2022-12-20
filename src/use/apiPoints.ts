const apiPoints = {
	todoList: `/api/todo/list`, //GET получение массива списков, POST создание нового списка
	editTodoList: `/api/todo/list/:list_id`, //Изменение / удаление списка

	addTodoItem: `/api/todo/item/in/:list_id`, //post Создание элемента списка
	editTodoItem: `/api/todo/item/:item_id`, //Изменение/удаление элемента списка
	todoItemComplete: `/api/todo/item/:item_id/complete`, //Отметка выполнения/невыполнеия дела
	
    makeUser: `/api/user/make`, //Создание пользователя без регистрации
}
export default apiPoints;