
require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs'); //file system
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


var input = process.argv[2];
for (i = 4; i < process.argv.length; i++) {
    userInput += " " + process.argv[i];
}


var spotify = new Spotify({
        id: SPOTIFY_ID,
        secret: SPOTIFY_SECRET
    });

var task = function(choice, input) {
    switch (choice) {
        case "movie-this":
            getMovie(input);
            break;
        case "my-tweets":
            getTweets(input);
            break;
        case "spotify-this-song":
            getMusic(input);
            break;
        case "do-what-it-says":
            doWhatItSays(input);
            break;
    }
}

var getMovie = function(input) {
	//will search OMDB for movie title and return data to console
};

var getTweets = function(input) {
	//will grab last 10 tweets from twitter account and display to console
};

var getMusic = function(input) {
	//will grab song title and artist ansd display info to console
	//will display "The Sign" by Ace of Base if no song provided
};

var doWhatItSays = function(input) {
	//will follow the command given in random.txt
};