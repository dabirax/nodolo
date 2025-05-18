const os = require("os");

// info about current user
const user = os.userInfo();

// System's uptime in seconds
console.log(os.uptime());

const currentOs = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};

console.log(currentOs)