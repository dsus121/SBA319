// public/js/indTodos.js
// I wanted to keep the todo functionality separate from the routes
//   and server logic

function updateTodo(todoId) {
    const plannedDate = document.getElementById(`plannedDate${todoId}`).value;
    const notes = document.getElementById(`notes${todoId}`).value;
    const checklist = document.getElementById(`checklist${todoId}`).value;

    fetch(`/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planned_date: plannedDate, notes, checklist }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error);
            });
        }
        return response.json();
    })
    .then(updatedTodo => {
        console.log('Updated to-do:', updatedTodo);
        // Optionally, update the UI to reflect the changes
        location.reload(); // Reload the page to show updated to-do list
    })
    .catch(error => console.error('Error updating to-do:', error));

    return false; // prevents default form submission
}

function deleteTodo(todoId) {
    fetch(`/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error);
            });
        }
        return response.json();
    })
    .then(deletedTodo => {
        console.log('Deleted to-do:', deletedTodo);
        location.reload(); // reload the page to show updated to-do list
    })
    .catch(error => console.error('Error deleting to-do:', error));
}
