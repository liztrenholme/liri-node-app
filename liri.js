require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var choice = process.argv[2];
var input = process.argv[3];

// calling API keys/parameters for use in later functions
var twitter = new Twitter(keys.twitter);

var params = {
    screen_name: 'tuesdayisyellow',
    count: 10
};

var spotify = new Spotify(keys.spotify);

// switch statement to recognize the choice commands
switch (choice) {
    case "movie-this":
        getMovie(input);
        break;
    case "my-tweets":
        getTweets();
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


function getMovie(input) {
    //will search OMDB for movie title and return data to console
    if (input === undefined) {
        input = "Mr. Nobody";
    }
    request('http://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=trilogy', function(error, response, body) {
        var data = JSON.parse(body);
        console.log(data.Title);
        console.log(data.Year);
        console.log(data.imdbRating);
        console.log(data.Country);
        console.log(data.Language);
        console.log(data.Plot);
        console.log(data.Actors);
        fs.appendFile('log.txt', data.Title + "\n" + data.Year + "\n" + data.imdbRating + "\n" + data.Country + "\n" + data.Language + "\n" + data.Plot + "\n" + data.Actors + "\n" + "\n");

    })
};

function getTweets() {
    //will grab last 10 tweets from twitter account and display to console
    twitter.get('statuses/user_timeline', params, function(err, tweets, response) {
        if (err) {
            return console.log(err)
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
            fs.appendFile('log.txt', tweets[i].text + tweets[i].acreated_at + "\n" + "\n");
        }
    })
};


function getMusic(input) {
    //will grab song title and artist ansd display info to console
    //will display "The Sign" by Ace of Base if no song provided
    if (input === undefined) {
        input = "The Sign";
    };

    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
        fs.appendFile('log.txt', data.tracks.items[0].artists[0].name + "\n" + data.tracks.items[0].name + "\n" + data.tracks.items[0].album.name + "\n" + data.tracks.items[0].preview_url + "\n" + "\n");

    });
};

// not working yet :(
function doWhatItSays(input) {
    //will follow the command given in random.txt
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (!err) {
            var txt = data.split(",");
            input = txt;
        } else {
            console.log("Error occured: " + err);
        }
    });
};