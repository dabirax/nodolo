const express = require("express");
const app = express();
const path = require("path");

//setup static and middleware
app.use(express.static("./navbar-app"));

// app.get("/", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "./navbar-app/index.html")
//     );
// });

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(5170, () => {
  console.log("hello");
});
