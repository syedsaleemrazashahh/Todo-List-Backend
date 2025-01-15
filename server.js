import express from "express";
import cors from "cors";
import "dotenv/config";
import "./database.js";
import { Todo } from "./models/index.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // ye body ko JSON mein convert karta hai
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      // "todo - list - backend.surge.sh"
    ],
  })
);

// Get all todos
app.get("/api/v1/todos", async (request, response) => {
  try {
    const todos = await Todo.find(
      {},

      { ip: 0, __v: 0, updatedAt: 0 } // projection (0 wale front per nhi aaye)

      // { todoContent: 1 } sirf todoContent show hoga frontend per aur kuxh show nhi hoga

      // { todoContent: 1, _id: 0 } // advance saruf id ma different keys use ho sagti hy like 0 and 1
    ).sort({ todoContent: -1 });

    const message = !todos.length ? "todos empty" : "ye lo sab todos";

    response.send({ data: todos, message: message });
  } catch (err) {
    response.send(500).send("Internal Server Error");
  }
});

// naya todo banane ki api hai
app.post("/api/v1/todo", async (request, response) => {
  try {
    const object = {
      todoContent: request.body.todo,
      ip: request.ip,
    };

    const result = await Todo.create(object);

    response.send({ message: "add ho raha hai", data: result });
  } catch (err) {
    response.send(500).send("Error aa gaya hai");
  }
});

// todo ko edit karne ki api hai
app.patch("/api/v1/todo/:id", async (request, response) => {
  const id = request.params.id;

  const result = await Todo.findByIdAndUpdate(id, {
    todoContent: request.body.todoContent,
  });
  console.log("result=>", result);

  if (result) {
    response.status(201).send({
      data: result,
      message: "todo update ho gaya hai!",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found" });
  }
});

// todo ko delete karne ki api hai
app.delete("/api/v1/todo/:id", async (request, response) => {
  const id = request.params.id;

  const result = await Todo.findByIdAndDelete(id);
  if (result) {
    response.status(201).send({
      // data: { todoContent: request.body.todoContent, id: id, },
      message: "Todo deleted ho gaya hai!",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found" });
  }
});

app.use((request, response) => {
  response.status(404).send({ message: "No Route Found!" });
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
