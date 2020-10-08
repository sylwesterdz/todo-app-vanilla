const baseUrl = 'http://localhost:3000/todos/';
const service = {
    async fetchTodoList () {
        let response = await fetch(baseUrl);
        let data = await response.json();
        return data;
    },

    async addTodo (newTodo) {
        await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        });
    },

    async deleteTodo (id) {
        await fetch(baseUrl + id, {
            method: 'DELETE',
        });
    },

    async editTodo (id, editedTodo) {
        await fetch(baseUrl + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedTodo)
        });
    }
}

export { service }