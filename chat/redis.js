const redis = require('redis');
const rejson = require('redis-rejson');
rejson(redis);
const client = redis.createClient();

module.exports = {

	saveMessage: function (message) {
		return new Promise((resolve, reject) => {
			client.json_set(message.id, '.', JSON.stringify(message), error => {
				if (error) {
					console.log(`Error ${error}`);
					reject(error);
				} else {
					console.log(`Message ${message.id} sent to Redis as JSON`);
					resolve()
				}
			});
		});
	},
	publishToStream: function (message) {
		client.xadd('chat-stream', '*', 'id', message.id, 'message', message.message, 'user', message.user);
	},
	getMessage: function (id) {
		return new Promise((resolve, reject) => {
			client.json_get(id, '.', (error, value) => {
				if (error) {
					reject(error);
				}else if (value){
					resolve(value);
				}else{
					reject('NOT_FOUND');
				}
			});
		});
	}

}