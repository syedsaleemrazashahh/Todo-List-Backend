import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

const todos = [];

app.use(express.json()); // ye body ko JSON mein convert karta hai
app.use(cors({ origin: ["http://localhost:5173"] }));

// Get all todos
app.get("/api/v1/todos", (request, response) => {
  const message = !todos.length ? "todos empty" : "ye lo sab todos";

  response.send({ data: todos, message: message });
});

// naya todo banane ki api hai
app.post("/api/v1/todo", (request, response) => {
  if (!request.body.todo) {
    return response.status(400).send({ message: "todo content required" });
  }

  const object = {
    todoContent: request.body.todo,
    id: String(new Date().getTime()),
  };

  todos.push(object);

  response.send({ message: "add ho raha hai", data: object });
});

// todo ko edit karne ki api hai
app.patch("/api/v1/todo/:id", (request, response) => {
  const id = request.params.id;

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      // idher product mil chuka hy (ab us product ko edit karna hy)

      todos[i].todoContent = request.body.todoContent;
      isFound = true;
      break;
    }
  }
  if (isFound) {
    response.status(201).send({
      data: {
        todoContent: request.body.todoContent,
        id: id,
      },
      message: "todo updated ho gaya hai!",
    });
  } else {
    response.status(200).send({
      data: null,
      message: "todo not found",
    });
  }
});

// todo ko delete karne ki api hai
app.delete("/api/v1/todo/:id", (request, response) => {
  const id = request.params.id;

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      // idher product mil chuka hy (ab us product ko deleted karna hy)
      todos.splice(i, 1);
      isFound = true;
      break;
    }
  }
  if (isFound) {
    response.status(201).send({
      data: {
        todoContent: request.body.todoContent,
        id: id,
      },
      message: "todo deleted ho gaya hai!",
    });
  } else {
    response.status(200).send({
      data: null,
      message: "todo not found",
    });
  }
});

app.use((request, response) => {
  response.status(404).send({ message: "No Route Found!" });
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
