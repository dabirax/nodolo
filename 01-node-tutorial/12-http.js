const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to Our Home Page");
  }
  if (req.url === "/about") {
    res.end("Here is a short history");
  }
  res.end(`
        <h1>Ooops!</h1>
        <p>We can't seem to find the page you are looking for</p>
        <a href="/"> back home</a>
        `);
});

server.listen(5000);
