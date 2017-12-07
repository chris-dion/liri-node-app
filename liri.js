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

var fs = require("fs");

var param = process.argv;


commands(param.splice(2, param.length));

function commands(arr){
	var func_call = arr[0];

	if (func_call === "my-tweets"){
		twitter();

	}else if (func_call === "spotify-this-song"){
		if(arr.length === 2){
			var track = arr[1];
			spotify_func(track);
		}else{
			var track = 'The Sign';
			spotify_func(track);
		}
		 
	}else if (func_call === "movie-this"){
		if(arr.length === 2){
			var title = arr[1];
			movie(title);
		}else{
			var title = 'Mr. Nobody';
			movie(title);
		}

	}else if (func_call === "do-what-it-says"){

		fs.readFile("random.txt", "utf8", function(error, data){
			if (error){
				return console.log(error);
			}

			var dataArr = data.split(",");
			commands(dataArr);

		});


	}else{
		console.log("command doesn't exist");
	}

}

function twitter(){
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
}

function spotify_func(song){
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	console.log("Artist: "+data.tracks.items[0].artists[0].name); 
	console.log("Album: "+data.tracks.items[0].album.name); 
	console.log("Song: "+data.tracks.items[0].name); 
	console.log("preview link : "+data.tracks.items[0].preview_url); 
	});

}

function movie(movie){
	request('http://www.omdbapi.com/?apikey=trilogy&t='+movie, function (error, response, body) {
	  var obj =  JSON.parse(body);
	  console.log("Title: " +obj.Title);
	  console.log("Year: " +obj.Year);
	  console.log("IMDB Rating: " +obj.imdbRating);
	  console.log("Country it was produced in: " +obj.Country);
	  console.log("Language: " +obj.Language);
	  console.log("Plot: " +obj.Plot);
	  console.log("Actors: " +obj.Actors);
	});
}