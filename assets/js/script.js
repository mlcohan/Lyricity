// variables to select elements from document
var searchBtn = document.getElementById("searchBtn");
var lyrics = document.getElementById("lyrics");
const favoriteBtn = document.querySelector("#favoriteTab");
var lastFmApiKey = "8c532e6fce66c0c0cae9e4ef54fbf478";
var albumDisplay = document.querySelector(".songImg");

// calling album cover api
function getFmApi(song, artist) {
  var requestUrl =
    "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=" +
    lastFmApiKey +
    "&artist=" +
    artist +
    "&track=" +
    song +
    "&format=json";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      albumCover = data.track.album.image[3]["#text"];
      if (albumCover == "") {
        albumDisplay.src = "./assets/images/mic.jpg";
      } else {
        albumDisplay.src = albumCover;
      }
    });
}
// calling kanye rest api
function kanye() {
  $.ajax({
    url: "https://api.kanye.rest",
    method: "GET",
  }).then(function (data) {
    lyrics.innerHTML =
      "Sorry, we didn't find any lyrics but here's a nice quote from Kanye!<br> " +
      '"' +
      data.quote +
      '"<br> - Kanye West';
    albumDisplay.src = "./assets/images/kanye-west.jpg";
  });
}
// defining function that calls the server-side API for lyrics
function getLyricsApi() {
  var song = encodeURIComponent(localStorage.getItem("song"));
  var artist = encodeURIComponent(localStorage.getItem("artist"));
  var requestUrl = "https://api.lyrics.ovh/v1/" + artist + "/" + song;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById('lyrics').innerText = data.lyrics;
    })
  if (data.lyrics === "") {
    kanye();
  } else {
    lyrics.innerText = data.lyrics;
  }
};

// this is the function to display song title and name below the album pic
function displayName(song, artist) {
  document.getElementById("songNameDisplay").innerText =
    titleCase(song) + " by " + titleCase(artist);
}
// this is to titlecase the song and artist
function titleCase(str) {
  return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
}
// toggles the favorite section on click
favoriteBtn.addEventListener("click", function () {
  const favoriteSection = document.querySelector(".favorites");
  favoriteSection.classList.toggle("slide");
});
// toggles the fav section when you click the "X"
$("#closeFavs").on("click", function () {
  const favoriteSection = document.querySelector(".favorites");
  favoriteSection.classList.remove("slide");
});
// new code for localStorage, stores the song and artist inputs
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  $(".main").addClass("fade");
  var button = $(this);
  var song = button.siblings("#song").val();
  var artist = button.siblings("#artist").val();
  if (!song || !artist) {
    alert("Please enter a song AND artist!");
  } else {
    localStorage.setItem("song", song.trim());
    localStorage.setItem("artist", artist.trim());
  }
  getLyricsApi();
  getFmApi(song, artist);
  displayName(song, artist);
});

$("#heartBtn").on("click", function() {
var song = encodeURIComponent(localStorage.getItem("song"));
var artist = encodeURIComponent(localStorage.getItem("artist"));
var heartButton = $("#heart");
//console.log(heartButton);
heartButton.removeClass("far");
heartButton.addClass("fas");
var newButton = $("<button>");
newButton.attr("id", "fav");
newButton.text(decodeURIComponent(song) + " by " + decodeURIComponent(artist));
$(".favList").append(newButton);
//local storage favorites
var songArray = JSON.parse(localStorage.getItem("songInfo")) || []; 
songArray.push({
  song: song,
  artist: artist
})
localStorage.setItem("songInfo", JSON.stringify(songArray));
})

function displayStorage() {
var songArray = JSON.parse(localStorage.getItem("songInfo")) || []; 
for (var i=0; i < songArray.length; i++) {
var newButton = $("<button>");
newButton.attr("id", "fav");
var favSong = decodeURIComponent(songArray[i].song)
var favArtist = decodeURIComponent(songArray[i].artist)
newButton.text(titleCase(favSong) + " by " + titleCase(favArtist));
$(".favList").append(newButton);
console.log(songArray[i]);
}
}

$(document).on("click", "#fav", function() {
// var songName = $(this).text().split(" ")[0];
var songArray = JSON.parse(localStorage.getItem("songInfo")) || []; 

})

displayStorage();

//come back to unFavorite-ing
// $(document).on("click", "#fav", function() {
// $(".heartbutton") 
// }