// variables to select elements from document
var searchBtn = document.getElementById("searchBtn");
var lyrics = document.getElementById("lyrics");
const favoriteBtn = document.querySelector("#favoriteTab");
function kanye() {
  $.ajax({
    url: "https://api.kanye.rest",
    method: "GET",
  }).then(function (data) {
    console.log(data);
    lyrics.innerHTML = "Sorry, no lyrics but here's a nice quote from Kanye.<br> " + "'" + data.quote + "'<br> - Kanye West";
  });
}

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
});
