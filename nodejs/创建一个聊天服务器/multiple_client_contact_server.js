var net = require('net');

var chatServer = net.createServer(),
    clientList = [];

chatServer.on('connection', function (client) {
    console.log(client.remoteFamily, client.remoteAddress, client.remotePort);

    // 把客户端的ip地址和端口号作为客户端的唯一标识
    client.name = `${client.remoteAddress} : ${client.remotePort}`;
    client.write(`Hi ${client.name} !\n`);

    clientList.push(client);

    client.on('data', function (data) {
        setTimeout(() => broadcast(data, client), 0);
    });

    /**
     * 向除开当前客户端以外的客户端发送消息
     * @param {*} message 客户端发送的消息
     * @param {CLIENT} client 当前客户端
     */
    function broadcast(message, client) {
        clientList.forEach((clnt, idx) => {
            if (client !== clnt) {
                console.log(client !== clnt)
                clnt.write(`${(new Date()).toLocaleString()}\r\n${client.name} says ${message}\r\n`);
            }
        });
    }
});

chatServer.listen(9000);
