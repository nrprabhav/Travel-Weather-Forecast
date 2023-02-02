// Add your own API key between the ""
let APIKey = "a4cd937b9cbcabbb845e8b24815e4ab0";
let coordinates = [0, 0];

// We then created an AJAX call
/*$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(queryURL);
  console.log(response);
  $(".city").text("City: " + response.name);
  $(".temp").text("Temperature: " + response.main.temp);
  // Create CODE HERE to Log the queryURL
  // Create CODE HERE to log the resulting object
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  // Create CODE HERE to transfer content to HTML
  // Hint: To convert from Kelvin to Celsius: C = K - 273.15
  // Create CODE HERE to dump the temperature content into HTML

});*/

function getCoordinates(queryCoordURL) {
    $.ajax({
        url: queryCoordURL,
        method: "GET"
    }).then(function (response) {
        console.log(response[0].lat);
        console.log(response[0].lon);
        let queryForecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + response[0].lat + "&lon=" + response[0].lon + "&appid=" + APIKey;
        getForecast(queryForecastURL);
    })
}

function getForecast(queryForecastURL) {
    $.ajax({
        url: queryForecastURL,
        method: "GET"
    }).then(function (response) {
        displayCurrentWeather(response);
        displayForecast(response);
    })
}

function displayCurrentWeather(response) {
    console.log(response);
    console.log(response.city.name);
    $("#city").text(response.city.name);
    let time = moment(response.list[0].dt, "X");
    $("#date").text(" (" + time.format("DD-MM-YYYY") + ")");
    $("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png");
    $("#current-temp").text((response.list[0].main.temp - 273.15).toFixed(2));
    $("#current-wind").text((response.list[0].wind.speed * 3.6).toFixed(2));
    $("#current-humidity").text(response.list[0].main.humidity);
}

function displayForecast(response) {
    for (let i = 1; i < 6; i++) {
        let time = moment(response.list[(i-1)*8+1].dt, "X");
        $("#date"+i).text(time.format("DD-MM-YYYY"));
        $("#weather-icon"+i).attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png");
        $("#current-temp"+i).text((response.list[i].main.temp - 273.15).toFixed(2));
        $("#current-wind"+i).text((response.list[i].wind.speed * 3.6).toFixed(2));
        $("#current-humidity"+i).text(response.list[i].main.humidity);
    }
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    // Here we are building the URL we need to query the database
    console.log($("#search-input").val().trim());
    var queryCoordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + $("#search-input").val().trim() + "&limit=1&appid=" + APIKey;
    getCoordinates(queryCoordURL);
})