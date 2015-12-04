var fs = require('fs');
var http = require('http');
var url = require('url');


var server = http.createServer(function(req, res) {

  var requestedPage = "";
  var queryPath = url.parse(req.url, true).pathname;
  var queryData = url.parse(req.url, true).query;

  fs.readFile(__dirname + queryPath, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }

    var dataIn = data.toString();
    var regexPattern = new RegExp(queryData.from, 'g');
    dataIn = dataIn.replace(regexPattern, queryData.to);

    res.writeHead(200);
    res.end(dataIn);
  });

});

server.listen(8080);
console.log("Server is Listening");
