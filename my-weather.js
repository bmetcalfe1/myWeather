$(document).ready(function() {

  $("#location-choice").on('submit', function (e) {
    var currentCity = e.currentTarget[0].value;
    var currentCountry = e.currentTarget[1].value;

    //Idea: add picture of city from first google images result
    var cityLink = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON(cityLink,
        {
            tags: currentCity + " skyline",
            tagmode: "any",
            format: "json"
        },
        function(data) {
            var rnd = Math.floor(Math.random() * data.items.length);
            var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
            $('body').css('background-image', "url('" + image_src + "')");

        });

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
      // Next: different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
      // icons based on weather, but do background image based on city
      // for icons follow FCC example

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
      // Next: Make accept other time zones

      $('.sunrise').text(formatSunrise);
      $('.sunset').text(formatSunset);
    });

   //stop form submission
   e.preventDefault();
  });

}); //doc ready
