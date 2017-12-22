var fs = require('fs');

const io = require('socket.io')({
    path: '/mySoketPath',
    serveClient: true,
});

const server = require('http').createServer(handler);

function handler(req, res) {
    fs.readFile(
        __dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        }
    );
}

io.attach(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: true
});

server.listen(80);

console.log('start')
var chat = io.of('/chat')
    .on('connection', function (socket) {
        console.log('chat connection');
        socket.emit('a message', {
            that: 'only',
            '/chat': 'will get'
        });
        chat.emit('a message', {
            everyone: 'in',
            '/chat': 'will get'
        });

        socket.on('hi', function (data) {
            console.log('chat hi data: ', data);
        })
        chat.on('hi', function (data) {
            console.log('chat hi data: ', data);
        })

        socket.on('a message', function (data) {
            console.log('chat a message data: ', data);
        });
        chat.on('a message', function (data) {
            console.log('chat a message data: ', data);
        });
    });

var news = io.of('/news')
    .on('connection', function (socket) {
        console.log('news connection');
        socket.emit('item', {
            news: 'item'
        });

        news.on('item', function (data) {
            console.log('news item data: ', data);
        });

        news.on('woot', function (data) {
            console.log('news woot data: ', data);
        });
    });
