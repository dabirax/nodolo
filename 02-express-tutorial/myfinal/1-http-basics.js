const http = require("http");
const { readFileSync } = require("fs");

// get all file
const home = readFileSync("./navbar-app/index.html");
const styles = readFileSync("./navbar-app/styles.css");
const image = readFileSync("./navbar-app/logo.svg");
const logic = readFileSync("./navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  //   console.log(req.method);
  //   console.log(req.url);
  const url = req.url;

  // home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(home);
    res.end();
  }
  
  //styles page
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(styles);
    res.end();
  }

  //logic page
  else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.write(logic);
    res.end();
  }

  //image page
  else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(image);
    res.end();
  }

  //about page
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<h1> About Page</h1>`);
    res.end();
  }


  //error page
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h1> Page Not Found. Oops???</h1>`);
    res.end();
  }
});
server.listen(5173);
