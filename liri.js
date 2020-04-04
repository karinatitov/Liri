require("dotenv").config();

// Spotify npm
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);


// query libraries
var keys = require("./keys.js");
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
}

// function doWhatItSays(){
//     fs.readFile("random.txt", "utf8", (error, data)) {
//         if(error){
//             console.log(error)
//         }
//     })
// }

function spotifyThisSong(song) {
    if (!song) {
        song = "The Sign";
    }

}

function movieThis(movie) {

    // var movie = movie.replace(/ /g, "+");

    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {

                //  console.log(response);
                //  Title of the movie.
                console.log("Title: " + response.data.Title);
                //   * Year the movie came out.
                console.log("Year: " + response.data.Year);
                //   * IMDB Rating of the movie.
                console.log("IMDB raiting: " + response.data.imdbRating);
                //   * Rotten Tomatoes Rating of the movie.
                //  console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
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
    // var artist = artist.replace(/ /g, "+");
    
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log(response);
         //  console.log("" + response.data.imdbRating);
        })
        .catch(function(error) {
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