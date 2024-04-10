'use strict';
let http = require('http');

http.createServer( (request, response) => {
    console.log(request.method); // GET
    if (request.method === 'GET') {
        console.log(request.url); // /un/repertoire/index.html?arg1=12&arg2=23
        let url = request.url.split('?')[0];
        let args = request.url.split('?')[1];

        let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Title</title>
            </head>
            <body>
            <p>
            Analyse de votre requête: <br>
            Vous accédez à l'url: ${url} <br>
            La chaine de requête est: ${args} 
            </p>
            </body>
            </html>`;
        response.writeHead(200, {
            'Content-Type': 'html',
            'Content-Length': Buffer.byteLength(html),
        });
        response.write(html);
        response.end();
    }
    else {
        response.writeHead(405);
        response.end();
    }

}).listen(8000);