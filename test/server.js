var http = require('http');
var fs = require('fs');
var path = require('path');
var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request starting...' + request.method + " " + request.url);

    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
  
  

    var filePath =path.join(__dirname,'..' , "dist" , request.url);
    var extname = path.extname(filePath);
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':

            console.log("sdfsdfsdfsfsdfs ",filePath)
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }
    //console.log(filePath)
    fs.readFile(filePath, function (error, content) {
        if (error) {
            console.error(error)
            if (error.code == 'ENOENT') {
                response.writeHead(404);
                response.end('Sorry, resource not found ..\n');
                response.end();

            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');