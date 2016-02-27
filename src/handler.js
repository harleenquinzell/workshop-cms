var fs = require('fs');

function handler(req, res) {
  var endpoint = req.url;

  if (endpoint === '/') {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/../public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      res.end(file);
    });
  } else if (endpoint === '/create/post') {
    var allData = '';

    req.on('data', function(data) {
      allData += data;
    });

    req.on('end', function() {
      res.writeHead(302, { "Location" : "/" });
      console.log(allData);
      res.end();
    });

  } else {

    var fileExtension = endpoint.split('.')[1];
    res.writeHead(200, {"Content-Type": "text/" + fileExtension });
    fs.readFile(__dirname + '/../public' + endpoint, function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      res.end(file);
    });
  }
}

module.exports = handler;
