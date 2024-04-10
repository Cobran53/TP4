'use strict';
let http = require('http');

http.createServer( (request,response) => {
    response.writeHead(200);
    response.write("Wesh alors");
    response.end();
}).listen(8000);