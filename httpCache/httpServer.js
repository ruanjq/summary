let http = require("http");
let fs = require("fs");
let url = require("url");
let mime = require("./mime").types;
let path = require("path");
const PORT = 8001;

let server = http.createServer((request, responce) => {
    let pathname = url.parse(request.url).pathname;
    let realPath = `static${pathname}`;
    let ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : "unknown";
    let contentType = mime[ext] || "text/plain";
    fs.exists(realPath, exists => {
        if (!exists) {
            responce.writeHead(404, {
                "Content-type": "text/plain"
            });
            responce.write(`This request URL ${pathname} was not found on this server`);
            responce.end();
        } else {
            fs.readFile(realPath, 'binary', (err, file) => {
                if (err) {
                    responce.writeHead(500, {
                        "Content-type": "text/plain"
                    });
                } else {
                    responce.setHeader("Cache-Control","public, max-age=86400");
                    responce.setHeader("Access-Control-Allow-Origin", "*");
                    responce.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                    responce.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
                    responce.writeHead(200,{
                        "Content-type": contentType
                    });
                    responce.write(file,"binary");
                }
                responce.end();
            });
        }
    });
});


server.listen(PORT);
console.log(`Server runing at port ${PORT}`);