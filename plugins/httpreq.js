Promise = require('bluebird'),
request = Promise.promisify(require('request')); 

httpRequest = function(options, log, cb, callback) {
	log(JSON.stringify(options, null, 4));
	request(options).then(function (resp) {
		console.log("call resp:["+ JSON.stringify(resp, null, 4) +"]"); 
		if (resp.statusCode == 201 || resp.statusCode == 200 ) {
			return callback(null,log, cb,  resp.body);
		} else {
			return callback(new Error(resp.body), log, cb);
		}
	}).catch(function (err) {
		log("call err:" + err.message);
		return callback(err, log, cb);
	});

}
exports.httpRequest=httpRequest;
