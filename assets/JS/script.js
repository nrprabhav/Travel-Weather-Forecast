// Add your own API key between the ""
var APIKey = "a4cd937b9cbcabbb845e8b24815e4ab0";

// Here we are building the URL we need to query the database
var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + $("#search-input").val().trim() + "&limit=1&appid=" + APIKey;
console.log(queryURL);
// We then created an AJAX call
$.ajax({
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

});