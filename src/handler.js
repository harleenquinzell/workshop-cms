var fs = require('fs');
var querystring = require('querystring');

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
    var jsonFile = './src/posts.json';
    var blogPosts;
    var newPost;
    var allTheData = '';
    var timestamp = Date.now();

    req.on('data', function(incomingData) {
      allTheData += incomingData;
    });

    req.on('end', function() {
      console.log('got all data!', allTheData);
      newPost = querystring.parse(allTheData);

      fs.readFile(jsonFile, function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        blogPosts = JSON.parse(file);
        blogPosts[timestamp] = newPost;

        fs.writeFile(jsonFile, JSON.stringify(blogPosts), function(error) {
          console.log(blogPosts);
          if (error) {
            console.log(error);
            return;
          }
          res.writeHead(302, { "Location" : "/" });
          res.end();
        });
      });
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
