
let io = require('socket.io').listen(8877);
global.socket_client = null;
module.exports = () => {
    io.sockets.on('connection', socket => {
        // console.log("Socket Connection Success");
        global.socket_client = socket;
    });
}
