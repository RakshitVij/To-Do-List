// Wait for the window to load before executing the code
window.addEventListener("load", () => {
  // Retrieve todos from localStorage, or initialize an empty array if not found
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Select the input element for the user's name
  const nameInput = document.querySelector("#name");

  // Select the form element for adding new todos
  const newTodoForm = document.querySelector("#new-todo-form");

  // Retrieve the username from localStorage, or use an empty string if not found
  const username = localStorage.getItem("username") || "";

  // Set the value of the name input to the retrieved username
  nameInput.value = username;

  // Save the username to localStorage whenever it changes
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  // Add an event listener to handle the form submission for new todos
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a new todo object with the entered content, category, and current timestamp
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    // Add the new todo to the todos array
    todos.push(todo);

    // Save the updated todos array to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Reset the form to clear the input fields
    e.target.reset();

    // Call the function to display all todos
    DisplayTodos();
  });

  // Call the function to display all todos when the page loads
  DisplayTodos();
});

// Function to display all todos
function DisplayTodos() {
  // Select the container element for the todo list
  const todoList = document.querySelector("#todo-list");

  // Clear the current content of the todo list
  todoList.innerHTML = "";

  // Iterate over each todo in the todos array
  todos.forEach((todo) => {
    // Create elements for each part of the todo item
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    // Set the input type to checkbox and its checked state to the todo's done property
    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    // Add a class to the span based on the todo's category
    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

    // Add classes and content to the todo item elements
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    // Set the inner HTML of the content and buttons
    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    // Append the elements to form the structure of the todo item
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    // Append the todo item to the todo list
    todoList.appendChild(todoItem);

    // If the todo is marked as done, add the 'done' class to the todo item
    if (todo.done) {
      todoItem.classList.add("done");
    }

    // Add an event listener to handle the checkbox click event
    input.addEventListener("click", (e) => {
      // Update the todo's done property based on the checkbox state
      todo.done = e.target.checked;
      // Save the updated todos array to localStorage
      localStorage.setItem("todos", JSON.stringify(todos));

      // Add or remove the 'done' class based on the todo's done state
      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      // Call the function to display all todos
      DisplayTodos();
    });

    // Add an event listener to handle the edit button click event
    edit.addEventListener("click", (e) => {
      // Select the input element inside the content div
      const input = content.querySelector("input");
      // Remove the readonly attribute to allow editing
      input.removeAttribute("readonly");
      // Focus on the input element
      input.focus();
      // Add an event listener to handle when the input loses focus (blur event)
      input.addEventListener("blur", (e) => {
        // Re-add the readonly attribute to prevent further editing
        input.setAttribute("readonly", true);
        // Update the todo's content with the new value
        todo.content = e.target.value;
        // Save the updated todos array to localStorage
        localStorage.setItem("todos", JSON.stringify(todos));
        // Call the function to display all todos
        DisplayTodos();
      });
    });

    // Add an event listener to handle the delete button click event
    deleteButton.addEventListener("click", (e) => {
      // Filter out the current todo from the todos array
      todos = todos.filter((t) => t != todo);
      // Save the updated todos array to localStorage
      localStorage.setItem("todos", JSON.stringify(todos));
      // Call the function to display all todos
      DisplayTodos();
    });
  });
}
