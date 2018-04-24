const path = require("path");
const express = require("express");
const sequelize = require("sequelize");
const models = require("./models");

const app = express(); //init our express app
//body-parser will take http request body and attach it
//to the request object automatticly for us
app.use(require(bodyParser).json());

//Configuring the app to use the right templeting engine
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("views", path.join(__dirname, "views")); //where are the views?
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app,
  get("pirates", (req, res) => {
    res.render("pirate-form");
  });

app.get("/ship", (req, res) => {
  res.render("ship");
});
app.post("/pirate", (req, res) => {
  console.log(req.body);
  res.send("Thanks");
});
app.listen(app.get("port"), () => {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
models.sequelize.sync().then(function() {
  app.listen(app.get("port"), () => {
    console.log(
      "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate."
    );
  });
});
