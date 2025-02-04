// check if the script is loaded
console.log("script loaded");

// add event listeners to the trail buttons
document.querySelectorAll(".trailButton").forEach((button) => {
  button.addEventListener("click", function () {
    const group = this.getAttribute("data-group");
    console.log("button clicked:", group);

    // hide all trail groups and show the selected one
    document.querySelectorAll(".trailGroup").forEach((group) => {
      group.style.display = "none";
    });
    document.getElementById(group).style.display = "block";
  });
});

// handle trail item click to fetch and display trail details
document.querySelectorAll(".trailItem").forEach((item) => {
  item.addEventListener("click", function () {
    const value = this.getAttribute("data-value"); // Get trail id
    console.log("trail item clicked:", value);

    // hide all trail groups when a trail item is clicked
    document.querySelectorAll(".trailGroup").forEach((group) => {
      group.style.display = "none";
    });

    // Fetch trail details
    fetch(`/trail/${value}`)
      .then((response) => response.json())  // expecting JSON response
      .then((trail) => {
        console.log("fetched trail details:", trail);
        const trailDetails = document.getElementById("trailDetails");
        trailDetails.innerHTML = ""; // clear previous details

        if (trail) {
          // store the selected trail id
          trailDetails.dataset.trailId = trail._id;

          // create and append the elements for trail details
          trailDetails.appendChild(createDetailElement('Trail name', trail.name));
          trailDetails.appendChild(createDetailElement('Description', trail.description || 'No description available'));
          trailDetails.appendChild(createDetailElement('Length', `${trail.length_mi_} miles`));
          trailDetails.appendChild(createDetailElement('Surface', trail.surface));
          trailDetails.appendChild(createDetailElement('One-way', trail.oneway));
        } else {
          trailDetails.textContent = "Trail details not found.";
        }
      })
      .catch((error) => console.error("Error fetching trail details:", error));
  });
});

// helper function to create and return a detail element
function createDetailElement(label, value) {
  const p = document.createElement("p");
  p.textContent = `${label}: ${value}`;
  return p;
}

// fetch and display user's to-do list
function fetchTodos(userId) {
  const todoList = document.getElementById("todoList");
  if (!todoList) return; // check if the element exists before setting innerHTML

  fetch(`/user/${userId}/todos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // expecting JSON response
    })
    .then((todos) => {
      todoList.innerHTML = ""; // clear previous todo items

      todos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.textContent = `${todo.trail_id.name} - ${todo.notes || "No notes"}`;
        todoList.appendChild(todoItem);
      });
    })
    .catch((error) => console.error("Error fetching to-dos:", error));
}

// call this function with the embedded user id when the page loads
fetchTodos(userId);

// handle add to todo button click
document.getElementById("planTrailButton").addEventListener("click", function () {
  const trailDetails = document.getElementById("trailDetails");
  const trailId = trailDetails.dataset.trailId;

  if (!trailId) {
    alert("Please select a trail first.");
    return;
  }

  const todo = {
    user_id: userId, // current user id
    trail_id: trailId,
    planned_date: new Date(),
    checklist: [],
    notes: "Planned hike",
  };

  console.log("Sending todo:", todo); // debugging line

  fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error);
        });
      }
      return response.json();
    })
    .then((newTodo) => {
      console.log("New todo:", newTodo);
      // Hide the button after successful request
      document.getElementById("planTrailButton").style.display = "none";
      // Optionally, display a confirmation message
      const confirmation = document.createElement("p");
      confirmation.textContent = "Trail added to your list!";
      trailDetails.appendChild(confirmation);
    })
    .catch((error) => console.error("Error creating todo:", error));
});
