$(document).ready(function() {

  $("#location-choice").on('submit', function (e) {
    var currentCity = e.currentTarget[0].value;
      console.log(currentCity);
    var currentCountry = e.currentTarget[1].value;
      console.log(currentCountry);
    var weatherKey = "3d116075e0fe88576d7d105ffb94897e";
    var weatherApiLink = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + weatherKey;
    $.getJSON(weatherApiLink, function(response) {
      // need some error handling...
      console.log("raw ", response);
      // weather-profile
      $('.main-description').text(response.weather[0].main);
      $('.detail-description').text(response.weather[0].description);
      // weather-data
      var tempCel = ((response.main.temp - 273.15).toFixed(2) + " °C");
      console.log("Celly", tempCel);
      var tempFar = response.main.temp - 273.15;

      $('.temps').text(tempCel);
      $('.clouds').text(response.clouds.all);
      $('.humidity').text(response.main.humidity);
      // sun-data
      $('.sunrise').text(response.sys.sunrise);
      $('.sunset').text(response.sys.sunset);
    });

   //stop form submission
   e.preventDefault();
  });

}); //doc ready

// 1. determine city
// 2. display weather
// 3. give user some options to customize. 

// let choose city/country, auto grab country code, and return data.
// I can push a button to toggle between Fahrenheit and Celsius.
// I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

