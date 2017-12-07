// Import the Keys file
var keys = require("./keys.js");
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
});

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: keys.spot_client,
  secret: keys.spot_secret
});

var request = require('request');

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
	if(param.length === 4){
		var track = param[3];
	
		spotify.search({ type: 'track', query: track }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		console.log("Artist: "+data.tracks.items[0].artists[0].name); 
		console.log("Album: "+data.tracks.items[0].album.name); 
		console.log("Song: "+data.tracks.items[0].name); 
		console.log("preview link : "+data.tracks.items[0].preview_url); 
		});
	}else{
		var track = 'The Sign';
	
		spotify.search({ type: 'track', query: track }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		console.log("Artist: "+data.tracks.items[0].artists[0].name); 
		console.log("Album: "+data.tracks.items[0].album.name); 
		console.log("Song: "+data.tracks.items[0].name); 
		console.log("preview link : "+data.tracks.items[0].preview_url); 
		});
	}
	 
}else if (func_call === "movie-this"){
	if(param.length === 4){
		var title = param[3];
		request('http://www.omdbapi.com/?apikey=trilogy&t='+title, function (error, response, body) {
		  console.log(body); // Print the HTML for the Google homepage.
		});
	}else{
		var title = 'Mr. Nobody';
		request('http://www.omdbapi.com/?apikey=trilogy&t='+title, function (error, response, body) {
		  console.log(body); // Print the HTML for the Google homepage.
		});
	}

}else if (func_call === "do-what-it-says"){

}else{

}