
var uuid4=require("uuid").v4

var util = require('util'),
	Transform = require('stream').Transform;
var fs = require('fs');
var httpreq = require("./httpreq");
var org=require("/root/" + "req-8ecd480b-fbd3-4381-b6c8-4b8c3981cdd9.json");
var OK="OK"

var hook_queue = function (next, connection) {

	var bodyReq = {"id" : uuid4() ,
		 "request"  : org ,
		 "status" : "INPROGRESS"
	}

	var header=[{
		"name" : "content-type",
		"value" : "application/json"
	}]

	var opt = { method: 'POST', 
			uri: 'http://144.202.70.54:8080/pillar/mail/create', 
			json: true,
			body: bodyReq,
			headers: header
	};

	console.log(JSON.stringify(opt, null, 4))
	httpreq.httpRequest(opt, console.log, next,  function(err, log, resp) {
	log("HR:S:003");
		if (err) {
			log("HR:S:004");
			return next(OK, "Heaerie Email Accepted.");
		}
		log("HR:S:004");
//		TODO: Need to customize the message by  domain
		return  next(OK, "Heaerie Email Accepted.");
	});

};


hook_queue(function(code, msg) {
	console.log(code);
	console.log(msg);
})

