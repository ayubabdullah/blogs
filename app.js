const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routers/blogRoutes');

const app = express();

const db =
  "mongodb://ayubabdullah:testtest@cluster0-shard-00-00.lpxa9.mongodb.net:27017,cluster0-shard-00-01.lpxa9.mongodb.net:27017,cluster0-shard-00-02.lpxa9.mongodb.net:27017/myblogs?ssl=true&replicaSet=atlas-7bdtqn-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// set view engine to use ejs for front end
app.set("view engine", "ejs");

// static midlleware
app.use(express.static("public"));

// form data midlleware
app.use(express.urlencoded({ extended: true }));

//morgan midlleware
app.use(morgan("dev"));

// routers
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes middleware

app.use('/blogs', blogRoutes);

// 404 midlleware
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
