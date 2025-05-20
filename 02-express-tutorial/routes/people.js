const express = require("express");
const router = express.Router();

const {getPeople, createPerson}=require('../controllers/people')

let { people } = require("../data");

// router.get("/", getPeople);
// router.post("/", createPerson );
router.route('/').get(getPeople).post(createPerson)

router.post("/postman", (req, res) => {
  // console.log(req.body)
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).send({ success: true, data: [...people, name] });
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(people);
  const person = people.find((person) => person.id === parseInt(id));

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
module.exports = router;
