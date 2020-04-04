require("dotenv").config();

// Spotify npm
var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
// var spotify = new Spotify({
//     id: keys.spotify.id,
//     secret: keys.spotify.secret
// });


// query libraries
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");


// liri commands
 var command = process.argv[2];
 // console.log("command: " + command);
// user's search
 var userInput = process.argv[3];
// console.log("input: " + userInput);


switch (command){
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

function spotifyThisSong(song){
    if (!song) {
        song = "The Sign";
    }

    spotify.search({ type: 'track', query: song}, function(error, data){
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
            
            //adds text to log.txt
            fs.appendFile('log.txt', songData.artists[0].name);
            fs.appendFile('log.txt', songData.name);
            fs.appendFile('log.txt', songData.preview_url);
            fs.appendFile('log.txt', songData.album.name);
            fs.appendFile('log.txt', "-----------------------");
          }
        } else{
          console.log('Error occurred.');
        }
      });

}

function movieThis(movie){
    axios.get("http://www.omdbapi.com/?t="+ movie +"&y=&plot=short&apikey=trilogy").then(
        function(response) {

           //  console.log(response);
          //  Title of the movie.
          console.log("Title: " + response.data.Title);
          //   * Year the movie came out.
          console.log("Year: " + response.data.Year);
          //   * IMDB Rating of the movie.
          console.log("IMDB raiting: " + response.data.imdbRating);
          //   * Rotten Tomatoes Rating of the movie.
          console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
          //   * Country where the movie was produced.
          console.log("Country: " + response.data.Country);

          //   * Language of the movie.
          console.log("Language: " + response.data.Language);

          //   * Plot of the movie.
          console.log("Plot: " + response.data.Plot);

          //   * Actors in the movie.
          console.log("Actors: " + response.data.Actors);
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
function concertThis(){

}





