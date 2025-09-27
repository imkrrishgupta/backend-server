const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {  // We have written what we have to response, but still we have not created what the server will listen
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello ice tea");
})

server.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`);
})