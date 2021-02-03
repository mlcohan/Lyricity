var searchBtn = document.getElementById('searchBtn');
var lyrics = document.getElementById('lyrics');

// new code for localStorage
searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  var button = $(this);
  var song = button.siblings('#song').val();
  var artist = button.siblings("#artist").val();
  localStorage.setItem("song", song);
  localStorage.setItem("artist", artist);
})

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
}

searchBtn.addEventListener('click', getLyricsApi);