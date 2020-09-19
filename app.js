const express = require("express");
const todoController = require("./controllers/todoController");

var app = express();

//set up template engine
app.set("view engine", "ejs");

//static files Middleware
app.use(express.static("./public/"));

//fire controllers

todoController(app);

//listen to port
app.listen(process.env.PORT || 3000);
