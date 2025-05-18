const { createReadStream } = require("fs");
const { result } = require("lodash");

const stream = createReadStream("./content/biFile.txt", {
  highWaterMark: 900000,
  encoding: "utf8",
});

stream.on("data", (result) => {
  console.log(result);
});
stream.on("error", (err) => console.log(err));
