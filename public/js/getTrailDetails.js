// check if the script is loaded
console.log("script loaded");

// add event listeners to the trail buttons
document.querySelectorAll('.trailButton').forEach(button => {
    button.addEventListener('click', function() {
        const group = this.getAttribute('data-group');
        console.log('button clicked:', group);
        
        // hide all trail groups
        document.querySelectorAll('.trailGroup').forEach(group => {
            group.style.display = 'none';
        });
        
        // show the selected trail group
        document.getElementById(group).style.display = 'block';
    });
});

// existing code to fetch trail details
document.querySelectorAll('.trailItem').forEach(item => {
    item.addEventListener('click', function() {
        const value = this.getAttribute('data-value'); // get trail id
        console.log('trail item clicked:', value);

        // hide all trail groups when a trail item is clicked
        document.querySelectorAll('.trailGroup').forEach(group => {
            group.style.display = 'none';
        });

        // update the url to match the correct route
        fetch(`/trail/${value}`)
            .then(response => {
                console.log('fetch response:', response);
                return response.json();  // parse the json response
            })
            .then(trail => {
                console.log('fetched trail details:', trail);
                const trailDetails = document.getElementById('trailDetails');
                trailDetails.innerHTML = ''; // clear previous details
                
                if (trail) {
                    // store the selected trail id
                    trailDetails.dataset.trailId = trail._id;

                    // create and append elements for trail details
                    const trailName = document.createElement('h3');
                    trailName.textContent = `trail name: ${trail.name}`;
                    trailDetails.appendChild(trailName);

                    const trailDescription = document.createElement('p');
                    trailDescription.textContent = `description: ${trail.description || 'no description available'}`;
                    trailDetails.appendChild(trailDescription);

                    const trailLength = document.createElement('p');
                    trailLength.textContent = `length: ${trail.length_mi_} miles`;
                    trailDetails.appendChild(trailLength);

                    const trailSurface = document.createElement('p');
                    trailSurface.textContent = `surface: ${trail.surface}`;
                    trailDetails.appendChild(trailSurface);

                    const trailOneway = document.createElement('p');
                    trailOneway.textContent = `oneway: ${trail.oneway}`;
                    trailDetails.appendChild(trailOneway);
                } else {
                    trailDetails.textContent = 'trail details not found.';
                }
            })
            .catch(error => console.error('error fetching trail details:', error));
    });
});

// function to fetch and display user's to-do list
function fetchTodos(userId) {
    const todoList = document.getElementById('todoList');
    if (!todoList) return; // check if the element exists before setting innerHTML
    
    fetch(`/user/${userId}/todos`)
        .then(response => response.json())
        .then(todos => {
            todoList.innerHTML = ''; // clear previous to-do items
            
            todos.forEach(todo => {
                const todoItem = document.createElement('li');
                todoItem.textContent = `${todo.trail_id.name} - ${todo.notes || 'no notes'}`;
                todoList.appendChild(todoItem);
            });
        })
        .catch(error => console.error('error fetching to-dos:', error));
}

// call this function with the embedded user id when the page loads
fetchTodos(userId);

// handle plan button click
document.getElementById('planTrailButton').addEventListener('click', function() {
    const trailDetails = document.getElementById('trailDetails');
    const trailId = trailDetails.dataset.trailId;
    
    if (!trailId) {
        alert('Please select a trail first.');
        return;
    }

    const todo = {
        user_id: userId, // use the embedded user id
        trail_id: trailId,
        planned_date: new Date(), // or prompt user to enter a date
        checklist: [],
        notes: 'planned hike',
    };

    console.log('sending todo:', todo); // Debugging line

    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error);
            });
        }
        return response.json();
    })
    .then(newTodo => {
        console.log('new todo:', newTodo);
        // Hide the button after successful request
        document.getElementById('planTrailButton').style.display = 'none';
        // Optionally, display a confirmation message
        const confirmation = document.createElement('p');
        confirmation.textContent = 'Trail added to your list!';
        trailDetails.appendChild(confirmation);
    })
    .catch(error => console.error('error creating todo:', error));
});
