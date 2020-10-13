import { service } from '../service/service.js';

const todoList = document.querySelector(".todo-list");
const btn = document.getElementById('submit');
let todos;

btn.addEventListener('click', function(e){
    e.preventDefault();
    fetchTodos.addTodo();
});

const fetchTodos = {
    async fetchTodoList() {
        todos = await service.fetchTodoList();
        this.displayTodos()
    },

    addTodo() {
        const inputValue = document.getElementById("todo").value;
        const newTodo = {
            title: inputValue,
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