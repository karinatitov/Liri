require("dotenv").config();
var keys = require("./keys.js");
// Spotify npm
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


// query libraries

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");


// liri commands
var command = process.argv[2];
// console.log("command: " + command);
// user's search
var userInput = process.argv.slice(3).join(" ");
// console.log("input: " + userInput);


switch (command) {
    case "spotify-this-song":
        spotifyThisSong(userInput);
        break;
    case "concert-this":
        concertThis(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default: {
        return console.log("Can't read the command " + command);
    }
}

function doWhatItSays(){
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } 
        //splitting each string in the txt file by the comma
        data = data.split(',');
        var command = '';

        //determining how to parse the data if there is more than one item
        if (data.length === 2) { 
            command = data[0];
            song = data[1];
        } else {
            //using the data in the txt sheet as the command if only one value
            command = data[0];
        }
        if (command === 'spotify-this-song') {
            spotifyThisSong(song);   
        } else {
            //if the user entry isn't a valid command
            console.log("Can't recognize the command");
        }

    });

}

function spotifyThisSong(song) {
    if (!song) {
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song}, function(error, data){
        // console.log(error)
        if(!error){

          for(var i = 0; i < data.tracks.items.length; i++){
            var songData = data.tracks.items[i];
            //artist
            console.log("Artist: " + songData.artists[0].name);
            //song name
            console.log("Song: " + songData.name);
            //spotify preview link
            console.log("Preview URL: " + songData.preview_url);
            //album name
            console.log("Album: " + songData.album.name);
            console.log("-----------------------");
          }
        } else{
          console.log('Error occurred.');
        }
      });
}

function movieThis(movie) {

    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                //  Title of the movie.
                console.log("Title: " + response.data.Title);

                //   * Year the movie came out.
                console.log("Year: " + response.data.Year);

                //   * IMDB Rating of the movie.
                console.log("IMDB raiting: " + response.data.imdbRating);

                //   * Country where the movie was produced.
                console.log("Country: " + response.data.Country);

                //   * Language of the movie.
                console.log("Language: " + response.data.Language);

                //   * Plot of the movie.
                console.log("Plot: " + response.data.Plot);

                //   * Actors in the movie.
                console.log("Actors: " + response.data.Actors);
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });


    if (movie === "Mr. Nobody") {
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");

    }
}

function concertThis(artist) {
    var artist = artist.replace(/ /g, "+");
    console.log(artist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function (response) {
                var list = response.data;
                 // console.log(list);

                for (var i = 0; i < list.length; i++) {
                    console.log("---------------Venue---------------");
                    console.log("Venue Name: " + list[i].venue.name);
                    console.log("Location: " + list[i].venue.country + " " + list[i].venue.city);
                    console.log("Venue Date: " + moment(list[i].datetime,"YYYY-MM-DD HH:mm A").format("MM/DD/YYYY hh:mm A"));
                    console.log("------------------------------");
                }
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}