var http = require('http');
var Twitter = require('twitter');

var client = new Twitter({
 consumer_key: 'DowyICZkyUmVc3v37ZkHrfxk7',
 consumer_secret: 'xA40pmCfF4N90b0llg52ujljwjhJv2usaZOFYa2uUNeUUDN8hC',
 access_token_key: '2187323928-TFgMptNNMvB444IsVahYTFYq7tddOJNLV6aNk7X',
 access_token_secret: 'HKdb5l1Z2b4PBGGYW7aUiP5SAvVEb7tu9CJAXKqMTtu5y'
});

var ip = '127.0.0.1';
var port = 3000;

var server = http.createServer(handleRequest);
console.log("Server Started & Listening on http://"+ip+":"+port);
server.listen(port, ip);

var headers = {
  "access-control-allow-origin": '*',
  "access-control-allow-headers": "content-type",
  "access-control-allow-methods": "GET, POST, OPTIONS, DELETE"
}

// Request Handler
function handleRequest (request, response){
  response.writeHead(200, headers);
  if(request.method === 'POST'){
    if(request.url === '/') {
      var data = '';
      console.log("request is: ",request.method);
      request.on('data', function(chunk){
        data += chunk;
      });
      request.on('end', function(){
        // Get tweets from specified username from Twitter module
        client.get('search/tweets', {q: data , count:25}, function(error, tweets, res){
         if(error) {console.log(error);}
         response.end(JSON.stringify(tweets)); // -> app.js send
        });
        console.log("Data Received: ",JSON.parse(data));
      });
    }
  }
}