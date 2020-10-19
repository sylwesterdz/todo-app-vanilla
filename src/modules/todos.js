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
        displayTodos();
        deleteTodo();
        editTodo();
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
            const editButton = document.createElement('button');
            deleteButton.id = 'delete-button';
            editButton.classList.add('edit-button');
            todoList.appendChild(listElement);
            listElement.textContent += todo.title;
            listElement.appendChild(deleteButton);
            deleteButton.textContent += 'Delete';
            listElement.appendChild(editButton);
            editButton.textContent += 'Edit';
        });
}

function deleteTodo() {
        const deleteButtons = document.querySelectorAll('#delete-button');
        
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                service.deleteTodo(todos[index].id);
                todos = service.fetchTodoList();
            });
        });
}

function editTodo() {
        const editButtons = document.querySelectorAll('.edit-button');
        const popupOverlay = document.querySelector('.overlay');
        const popupAccept = document.querySelector('.accept');
        const popupClose = document.querySelector('.close');
        const popupCancel = document.querySelector('.cancel');
        const popupEdit = document.querySelector('#editbar');
        let currentTodoIndex;
        
        editButtons.forEach((editButton, index) => {
            editButton.addEventListener('click', () => {
                popupOverlay.classList.add('active');
                popupEdit.value = todos[index].title;
                currentTodoIndex = index;
            });
        });

        popupAccept.addEventListener('click', () => {
            const editedTodo = {
                title: popupEdit.value,
            }
            service.editTodo(todos[currentTodoIndex].id, editedTodo );
            popupOverlay.classList.remove('active');
        });
        
        popupClose.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });

        popupCancel.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });

        popupOverlay.addEventListener('click', (event) => {
            if (event.target.classList.contains('overlay'))
            popupOverlay.classList.remove('active');
        });

}

export { fetchTodoList }  