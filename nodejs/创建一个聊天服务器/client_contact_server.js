var net = require('net');

var chatServer = net.createServer(),
    clientList = [];

chatServer.on('connection', function (client) {
    client.write('Hi!\n');

    clientList.push(client);

    client.on('data', function (data) {
        clientList.forEach(clnt => clnt.write(`\nserver: ${data}\n`));
    });
});

chatServer.listen(9000);
