// variables to select elements from document
var searchBtn = document.getElementById("searchBtn");
var lyrics = document.getElementById("lyrics");
const favoriteBtn = document.querySelector("#favoriteTab");
// defining function that calls the server-side API for lyrics
function getLyricsApi() {
  var song = encodeURIComponent(localStorage.getItem("song"));
  var artist = encodeURIComponent(localStorage.getItem("artist"));
  var requestUrl = "https://api.lyrics.ovh/v1/" + artist + "/" + song;
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      document.getElementById("lyrics").innerText = data.lyrics;
    });
}
// toggles the favorite section on click
favoriteBtn.addEventListener("click", function () {
  const favoriteSection = document.querySelector(".favorites");
  favoriteSection.classList.toggle("slide");
});
// new code for localStorage, stores the song and artist inputs
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var button = $(this);
  var song = button.siblings("#song").val();
  var artist = button.siblings("#artist").val();
  if (!song || !artist) {
    alert("Please enter a song AND artist!");
  } else {
    localStorage.setItem("song", song);
    localStorage.setItem("artist", artist);
  }
  getLyricsApi();
});
