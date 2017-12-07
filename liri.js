// Import the Keys file
var keys = require("./keys.js");
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
})

var param = process.argv;

var func_call = param [2];

if (func_call === "my-tweets"){
	var params = {screen_name: 'liri_bot_1'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (i = 0; i < tweets.length; i++){
	  		console.log(tweets[i].text);
	  	}
	  }else{
	  	console.log(error);
	  }
	});

}else if (func_call === "spotify-this-song"){

}else if (func_call === "movie-this"){

}else if (func_call === "do-what-it-says"){

}else{

}