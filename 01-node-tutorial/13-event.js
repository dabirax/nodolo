const EventEmitter = require("events");
const customEmitter = new EventEmitter();

customEmitter.on("response", (name, id) => {
  console.log(`data received for ${name} with id: ${id} `);
});
customEmitter.on("response", () => {
  console.log("some other data");
});
customEmitter.emit("response", "john", 34);
