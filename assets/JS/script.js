// API key for Open Weather Map
let APIKey = "a4cd937b9cbcabbb845e8b24815e4ab0";
let coordinates = [0, 0];

let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
if (searchHistory == null) {
    searchHistory = [];
}else{
    let cityName = searchHistory[0];
    let queryCoordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + APIKey;
    getCoordinatesAndForecast(queryCoordURL);
    addToSearchHistory();
}

function getCoordinatesAndForecast(queryCoordURL) {
    // Get the Coordinates of the place and the weather forecast

    $.ajax({
        url: queryCoordURL,
        method: "GET"
    }).then(function (response) {
        let queryForecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + response[0].lat + "&lon=" + response[0].lon + "&appid=" + APIKey;
        $("#city").text(response[0].name);
        getForecast(queryForecastURL);
    })
}

function getForecast(queryForecastURL) {
    // Get the weather forecast given an URL with the coordinates

    $.ajax({
        url: queryForecastURL,
        method: "GET"
    }).then(function (response) {
        displayCurrentWeather(response);
        displayForecast(response);
    })
}

function displayCurrentWeather(response) {
    // Display the Current Weather of the desired place using the response from the API as input

    let time = moment(response.list[0].dt, "X");
    $("#date").text(" (" + time.format("DD-MM-YYYY") + ")");
    $("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png");
    $("#current-temp").text((response.list[0].main.temp - 273.15).toFixed(0));
    $("#current-wind").text((response.list[0].wind.speed * 3.6).toFixed(2));
    $("#current-humidity").text(response.list[0].main.humidity);
}

function displayForecast(response) {
    // Display the weather forecast for the place using the response from the API as input

    for (let i = 1; i < 6; i++) {
        let time = moment(response.list[(i-1)*8+1].dt, "X");
        $("#date"+i).text(time.format("DD-MM-YYYY"));
        $("#weather-icon"+i).attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png");
        $("#current-temp"+i).text((response.list[i].main.temp - 273.15).toFixed(0));
        $("#current-wind"+i).text((response.list[i].wind.speed * 3.6).toFixed(2));
        $("#current-humidity"+i).text(response.list[i].main.humidity);
    }
}

function addToSearchHistory() {
    // Update the search history display

    $("#history").empty();
    for(let i=0; i<searchHistory.length; i++) {
        let button = $("<button>");
        button.attr("class","btn btn-secondary w-100 mt-1 mb-1");
        button.text(searchHistory[i]);
        $("#history").append(button);
    }
}

function capitalizeFirstLetter(string) {
    // Capitalize the first letter of a string

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchHistoryContains(cityName) {
    // Check if 'cityName' is already in the search history

    for(i=0;i<searchHistory.length;i++){
        if(searchHistory[i]===cityName){
            return true;
        }
    }
    return false;
}

$("#search-button").on("click", function (event) {
    // Click event when search is pressed

    event.preventDefault();
    // Building the URL we need to query the database to get the coordinates of the place
    let cityName = $("#search-input").val().trim();
    console.log(cityName);
    let queryCoordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + $("#search-input").val().trim() + "&limit=1&appid=" + APIKey;

    // Get Coordinates of the place and then get the forecast
    getCoordinatesAndForecast(queryCoordURL);

    // Add the place to the search history if it does not contain it already
    if(!searchHistoryContains(capitalizeFirstLetter(cityName)))
        searchHistory.push(capitalizeFirstLetter(cityName));
    addToSearchHistory(); // Update display
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); // Update local storage
})

$("#history").on("click", "button", function (event) {
    // Click event when one of the items in the search history are clicked

    event.preventDefault();
    // Building the URL we need to query the database to get the coordinates of the place
    let cityName = event.target.textContent;
    console.log(cityName);
    let queryCoordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + APIKey;
    
    // Get Coordinates of the place and then get the forecast
    getCoordinatesAndForecast(queryCoordURL);
    $("#search-input").val(cityName);
})