import express, { response } from "express";
const app = express();
const port = process.env.port || 3000;

app.get("/get-all-todos", (request, response) => {
  response.send("<h1>Syed Saleem Raza Shah</h1>");
});

// ye api new todo banati hai
app.post("/add-todo", (request, response) => {});

// ye todo ko edit karne ki api hai
app.patch("/edit-todo/:id", (request, response) => {});

app.use((request, response) => {
  response.status(404).send("No Route Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
