const redis = require('redis');
const client = redis.createClient();

const xread = (stream, id) => {
	client.xread('BLOCK', 0, 'STREAMS', stream, id, (err, str) => {
		if (err) return console.error('Error reading from stream:', err);

		str[0][1].forEach(message => {
			id = message[0];
			console.log(`Message from ${message[1][5]}: ${message[1][3]} on Stream`);
		});

		setTimeout(() => xread(stream, id), 0)
	});
}

xread('chat-stream',0);