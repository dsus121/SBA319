document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('userSelect');
    const todoList = document.getElementById('todoList');

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user._id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        });

    userSelect.addEventListener('change', () => {
        const userId = userSelect.value;
        fetch(`/todos?user_id=${userId}`)
            .then(response => response.json())
            .then(todos => {
                todoList.innerHTML = '';
                todos.forEach(todo => {
                    const div = document.createElement('div');
                    div.textContent = `Trail: ${todo.trail_id.name}, Favorite: ${todo.favorite}`;
                    todoList.appendChild(div);
                });
            });
    });
});
