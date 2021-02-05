// variables to select elements from document
var searchBtn = document.getElementById("searchBtn");
var lyrics = document.getElementById("lyrics");
const favoriteBtn = document.querySelector("#favoriteTab");
var lastFmApiKey = "8c532e6fce66c0c0cae9e4ef54fbf478";
var albumDisplay = document.querySelector(".songImg");
// calling album cover api
function getFmApi(song, artist) {
  var requestUrl = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=" + lastFmApiKey + "&artist=" + artist + "&track=" + song + "&format=json"
  fetch(requestUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      albumDisplay.src = data.track.album.image[3]["#text"];
    })
}
// calling kanye rest api
function kanye() {
  $.ajax({
    url: "https://api.kanye.rest",
    method: "GET",
  }).then(function (data) {
    lyrics.innerHTML = "Sorry, we didn't find any lyrics but here's a nice quote from Kanye!<br> " + '"' + data.quote + '"<br> - Kanye West'  ;
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
      if(data.lyrics === ""){
        kanye();
      } else {
        lyrics.innerText = data.lyrics;
      }
    });
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
  var button = $(this);
  var song = button.siblings("#song").val();
  var artist = button.siblings("#artist").val();
  $(".songImg").addClass("animateImg");
  if (!song || !artist) {
    alert("Please enter a song AND artist!");
  } else {
    localStorage.setItem("song", song);
    localStorage.setItem("artist", artist);
  }
  getLyricsApi();
  getFmApi(song, artist);
});
