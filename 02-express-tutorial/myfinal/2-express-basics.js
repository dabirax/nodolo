const express = require("express");
const app = express();

//app.get
app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});
app.get("/about", (req, res) => {
  res.status(200).send("About");
});

//app.post
//app.pull
//app.delete

//app.all
app.all("*", (req, res) => {
  res.status(404).send(`<h1>Resource is not found </h1>`);
});

//app.use
//app.listen
app.listen(5170, () => {
  console.log("server is listening on port 5170...");
});
