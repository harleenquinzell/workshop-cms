var http = require('http');
var fs = require('fs');

function handler(req, res) {
  var endpoint = req.url;
  var method = req.method;

  if (endpoint === '/') {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      res.end(file);
    });

  } else {

    var fileExtension = endpoint.split('.')[1];

    res.writeHead(200, {"Content-Type": "text/" + fileExtension });
    fs.readFile(__dirname + '/public' + endpoint, function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      res.end(file);
    });
  }
}

var server = http.createServer(handler);

server.listen(3000, function () {
    console.log("Server is listening on port 3000.  Ready to accept requests!");
});
