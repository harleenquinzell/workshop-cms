var http = require('http');

var message = "I\'m very happy this morning!";

function handler(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(message);
  res.end();
}

var server = http.createServer(handler);

server.listen(3000, function () {
    console.log("Server is listening on port 3000.  Ready to accept requests!");
});
