const express = require("express");
const app = express();
let { people } = require("./data");

// static assets
app.use(express.static("./methods-public"));

//parse form data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).send({ success: true, person: name });
});

app.post("/login", (req, res) => {
  // console.log(req.body)
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome, ${name}`);
  }
  res.status(401).send("Please provide valid credentials");
});

app.post("/postman/people", (req, res) => {
  // console.log(req.body)
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).send({ success: true, data: [...people, name] });
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(id, name);

  const person = people.find((person) => person.id == Number(id));

  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: `No person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).send({ success: true, person: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  console.log(id)
  console.log(people)
  const person = people.find((person) =>  person.id === parseInt(id));

  console.log(person);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with the id ${req.params.id}` });
  }

  const newPeople = people.filter((person) => person.id !== Number(id));

  console.log(person);
  
  res.status(200).json({ success: true, data: newPeople });
});

app.listen(5171, () => {
  console.log("hello");
});
