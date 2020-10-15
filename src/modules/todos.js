import { service } from '../service/service.js';

const todoList = document.querySelector('.todo-list');
const addButton = document.getElementById('add-button');
let todos;

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    addTodo();
});


    async function fetchTodoList() {
        todos = await service.fetchTodoList();
        //console.log(todos[0].id);
        displayTodos();
        deleteTodo();
    }

    function addTodo() {
        const todoTitle = document.getElementById('todo').value;
        const newTodo = {
            title: todoTitle,
            done: false,
        };

        service.addTodo(newTodo)
    }

    function displayTodos() {
        todos.forEach(todo => {
            const listElement = document.createElement('li');
            const deleteButton = document.createElement('button');
            deleteButton.id = 'delete-button';
            todoList.appendChild(listElement);
            listElement.textContent += todo.title;
            listElement.appendChild(deleteButton);
            deleteButton.textContent += 'Delete';
        });
    }

    function deleteTodo() {
        const deleteButtons = document.querySelectorAll('#delete-button');
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                service.deleteTodo(todos[index].id);
                todos = service.fetchTodoList();
                console.log(todos);
            });
        });
    }



export { fetchTodoList }