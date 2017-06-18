//gets nearby restaurants based on user location from ZOMATO Api

var host = 'developers.zomato.com';
var apiKey = 'Zomato API key Here';
var querystring = require('querystring');
var https = require('https');

function performRequest(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {
	  'Content-Type': 'application/json',
      'Content-Length': dataString.length,
	  'user-key' : apiKey
	};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
	  'user-key' : apiKey
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log("response" + responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}

var https = require('https');

exports.handler = (event, context, callback) => {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
    performRequest('/api/v2.1/geocode', 'GET', 'lat='+event.lat+'&lon='+event.lon, function(data) {
		console.log('Fetched ' + data );
		context.succeed(data);
	  });
    

};