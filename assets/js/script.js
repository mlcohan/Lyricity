var searchBtn = document.getElementById('searchBtn');
var lyrics = document.getElementById('lyrics');
var apiKey = "fcd1b48c91b72419936d93f94cc0104f";
var proxyurl = 'https://cors-anywhere.herokuapp.com/';

// call function that will keep input via localstorage on page upon refresh
renderInput();

// function for pulling input from localstorage and inputing into value
function renderInput() {
  var value = localStorage.getItem("value");
  var formInput = $("#formInput").children("input");
  console.log(formInput);
  $("#formInput").children("input").val(value);
  if (!value) {
    return;
  }
}

// new code for localStorage
searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  var button = $(this);
  var value = button.parent().children('input').val();
  localStorage.setItem("value", value);
  renderInput();
})

function getLyricsApi() {
  var value = encodeURIComponent(localStorage.getItem("value"));
  var requestUrl = "https://api.musixmatch.com/ws/1.1/track.search?apikey=" + apiKey + "&format=json&q_lyrics=" + value + "&quorum_factor=1";
  console.log(requestUrl);
  fetch(proxyurl + requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
}

searchBtn.addEventListener('click', getLyricsApi);