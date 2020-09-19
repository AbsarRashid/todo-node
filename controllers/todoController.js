const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//Connect to Database
mongoose.connect(
  "mongodb+srv://test-user:test@cluster0.dsza6.mongodb.net/test-user?retryWrites=true&w=majority"
);
//Create Schema-this is like Blue Print
const todoSchema = new mongoose.Schema({ item: String });
//New model
let toDo = mongoose.model("Todo", todoSchema);
// let itemOne = new toDo({ item: "Buy Flowers" }).save((err) => {
//   if (err) throw err;
//   console.log("Saved");
// });

var data = [];
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function (app) {
  app.get("/todo", (request, response) => {
    //get data from mongodb and pass it to view
    toDo.find({}, (err, data) => {
      if (err) throw err;
      response.render("todo", { todos: data });
    });
  });
  app.post("/todo", urlencodedParser, (request, response) => {
    //Get data from view and added to mongodb
    let newTodo = toDo(request.body).save((err) => {
      if (err) throw err;
      response.json(data);
    });
  });
  app.delete("/todo/:item", (request, response) => {
    //Delete requested item from mongo db
    toDo
      .find({ item: request.params.item.replace(/\-/g, " ") })
      .remove((err, data) => {
        if (err) throw err;
        response.json(data);
      });
  });
};
