
require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs'); //file system
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


var input = process.argv[2];
for (i = 4; i < process.argv.length; i++) {
    input += " " + process.argv[i];
}


//var spotify = new Spotify({
  //      id: SPOTIFY_ID,
    //    secret: SPOTIFY_SECRET
    //});

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
        default:
        	console.log("That didn't work. Try movie-this, my-tweets, spotify-this-song, or do-what-it-says");
    }
}

var getMovie = function(input) {
	//will search OMDB for movie title and return data to console
};

var getTweets = function(input) {
	//will grab last 10 tweets from twitter account and display to console
};


	//will grab song title and artist ansd display info to console
	//will display "The Sign" by Ace of Base if no song provided
var getMusic = function(song) {
  if (song === undefined) {
    song = "The Sign";
  };

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songs = data.tracks.items;
    var data = [];

    for (var i = 0; i < songs.length; i++) {
      data.push({
        'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    console.log(data);
    writeToLog(data);
  });
};


var doWhatItSays = function(input) {
	//will follow the command given in random.txt
};