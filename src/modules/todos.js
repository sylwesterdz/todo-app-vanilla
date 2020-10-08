import { service } from '../service/service.js';

const todoList = document.querySelector(".todo-list");
let todos;

const aaa = {
    async fetchTodoList() {
        todos = await service.fetchTodoList();
        this.displayTodos()
    },

    displayTodos() {
        todos.forEach(todo => {
            const listElement = document.createElement('li');
            todoList.appendChild(listElement);
            listElement.textContent += todo.title;
        })
    }

}

export { aaa }