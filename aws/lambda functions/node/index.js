var curl = require('curlrequest');
var apiKey = '322c87cea1155fafc73b318c31effe23';

var headers = {
      'Content-Type': 'application/json',
	  'user-key' : apiKey
    };

exports.handler = (event, context, callback) => {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
	var url = 'https://developers.zomato.com/api/v2.1/geocode?'+'lat='+event.lat+'&lon='+event.lon;
	var options = {
    url: url,
    method: 'GET',
    headers: headers
	};
    curl.request(options, function (err, data) {
		
		console.log(data);
		context.succeed(data);
	});

};