const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const redisUtil = require('./redis')
const { v4: uuid } = require('uuid');

io.on('connection', (socket) => {
	socket.on('chat', (msg) => {
		msg.id = uuid();
		io.emit('chat', msg);
		redisUtil.saveMessage(msg);
		redisUtil.publishToStream(msg);
	});
});

app.get('/message/:id', (req, res) => {
	redisUtil.getMessage(req.params.id).then(msg=>{
		res.send(msg);
	}).catch(err=>{
		res.status(500).send(err);
	})
});

app.use(express.static('static'));

server.listen(3000, () => {
	console.log('listening on *:3000');
});
