const express = require("express");
const app = express();
const PORT = 3000;

let todos = [
  {
    id: 1,
    title: "Learn API",
    complete: false,
  },
  {
    id: 2,
    title: "Learn REST",
    complete: true,
  },
  {
    id: 3,
    title: "Learn CRUD",
    complete: false,
  },
];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});

app.get("/hello", function (request, response) {
  response.json({ message: "hello nodemon" });
});

// todo apps api
// CRUD

// Create
app.post("/todo", (request, response) => {
  // add new todo to "db"
  const title = request.body.title;

  todos.push({
    id: 1,
    title: title,
    complete: false,
  });

  response.status(201).json({ message: "todo added" });
});

// Read all
app.get("/todo", function (request, response) {
  response.json(todos);
});

// Read one
app.get("/todo/:id", function (request, response) {
  const id = request.params.id;

  // check if todo exist
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    response.status(404).json({ message: "todo not found" });
  }

  response.json(todo);
});

// Update
app.put("/todo/:id", (request, response) => {
  const id = request.params.id;

  // check if todo exist
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    response.status(404).json({ message: "todo not found" });
  }

  // todo exist
  const title = request.body.title;
  const updatedTodo = todos.map((todo) => {
    if (todo.id === Number(id)) {
      return {
        ...todo,
        title: title,
      };
    }
    return todo;
  });

  todos = updatedTodo;
  response.status(200).json({ message: `todo ${id} updated` });
});

// Delete
app.delete("/todo", (request, response) => {
  // todo id to be deleted
  const requestId = request.body.id;

  // find if todo exist
  const todo = todos.find((todo) => todo.id === requestId);

  if (!todo) {
    response.status(404).json({ message: "todo not found" });
  }

  // delete todo by id
  const newTodos = todos.filter((todo) => {
    if (todo.id !== requestId) {
      return todo;
    }
  });

  todos = newTodos;

  response.status(200).json({ message: `todo ${requestId} deleted` });
});
