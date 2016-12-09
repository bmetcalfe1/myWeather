$(document).ready(function() {

  $("#location-choice").on('submit', function (e) {
    var currentCity = e.currentTarget[0].value;
    var currentCountry = e.currentTarget[1].value;
    var weatherKey = "3d116075e0fe88576d7d105ffb94897e";
    var weatherApiLink = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + weatherKey;
    $.getJSON(weatherApiLink, function(response) {
      // need some error handling...
      console.log(response);
      // ***
      // weather-profile
      // ***
      $('.main-description').text(response.weather[0].main);
      $('.detail-description').text(response.weather[0].description);
      // ***
      // weather-data
      // ***
      var tempCel = ((response.main.temp - 273.15).toFixed(2) + " °C");
      var tempFar = ((( response.main.temp - 273.15) * 9/5) + 32).toFixed(2) + " °F";
      //countries where farhenheit
      if (currentCountry === "US" ||
          currentCountry === "BZ" ||
          currentCountry === "KY" ||
          currentCountry === "GU" ||
          currentCountry === "PR" ||
          currentCountry === "PW" ||
          currentCountry === "VA") 
      {
        $('.temps').text(tempFar);  
      }
      else {
        $('.temps').text(tempCel);
      }
      $('.clouds').text(response.clouds.all);
      $('.humidity').text(response.main.humidity);
      // ***
      // sun-data
      // ***
      var parsedSunriseHours = new Date(response.sys.sunrise*1000).getHours();
        if (parsedSunriseHours < 10) {
          parsedSunriseHours = "0" + parsedSunriseHours;
        }
      var parsedSunriseMins = new Date(response.sys.sunrise*1000).getMinutes();
        if (parsedSunriseMins < 10) {
          parsedSunriseMins = "0" + parsedSunriseMins;
        }
      var parsedSunsetHours = new Date(response.sys.sunset*1000).getHours();
        if (parsedSunsetHours < 10) {
          parsedSunsetHours = "0" + parsedSunsetHours;
        }
      var parsedSunsetMins = new Date(response.sys.sunset*1000).getMinutes();
        if (parsedSunsetMins < 10) {
          parsedSunsetMins = "0" + parsedSunsetMins;
        }
      var formatSunrise = parsedSunriseHours + ":" + parsedSunriseMins;
      var formatSunset = parsedSunsetHours + ":" + parsedSunsetMins; 

      $('.sunrise').text(formatSunrise);
      $('.sunset').text(formatSunset);
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

