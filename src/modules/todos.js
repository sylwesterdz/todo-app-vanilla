import { service } from '../service/service.js';

const todoList = document.querySelector('.todo-list');
const addButton = document.getElementById('add-button');
let todos;

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetchTodos.addTodo();
});

const fetchTodos = {
    async fetchTodoList() {
        todos = await service.fetchTodoList();
        this.displayTodos()
    },

    addTodo() {
        const todoTitle = document.getElementById('todo').value;
        const newTodo = {
            title: todoTitle,
            done: false,
        };

        service.addTodo(newTodo)
    },

    displayTodos() {
        todos.forEach(todo => {
            const listElement = document.createElement('li');
            todoList.appendChild(listElement);
            listElement.textContent += todo.title;
        });
    },

};

export { fetchTodos }