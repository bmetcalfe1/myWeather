$(document).ready(function() {

  getLocation();

  function getLocation() {
    $.get("http://ipinfo.io", function(location) {
        console.log(location);
        getPhoto(location.city);
      }, 'jsonp');
    }

  function getPhoto(location) {
    var cityLink = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON(cityLink,
      {
          tags: location + " skyline",
          tagmode: "any",
          format: "json"
      },
      function(data) {
        var rnd = Math.floor(Math.random() * data.items.length);
        var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
        $('html').css('background-image', "url('" + image_src + "')");
    });
  }

  $("#location-choice").on('submit', function (e) {
    var currentCity = e.currentTarget[0].value;
    var currentCountry = e.currentTarget[1].value;

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
            $('html').css('background-image', "url('" + image_src + "')");
        });

    var weatherKey = "3d116075e0fe88576d7d105ffb94897e";
    var weatherApiLink = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + weatherKey;
    $.getJSON(weatherApiLink, function(response) {
      // need some error handling...
      console.log(response);
      // ***
      // weather-profile
      // ***
      function iconGen(weather) {
        var weather = weather.toLowerCase();
        switch (weather) {
          case 'drizzle':
            addIcon(weather)
            break;
          case 'clouds':
            addIcon(weather)
            break;
          case 'rain':
            addIcon(weather)
            break;
          case 'snow':
            addIcon(weather)
            break;
          case 'clear':
            addIcon(weather)
            break;
          case 'mist':
            addIcon(weather)
            break;
          case 'thunderstom':
            addIcon(weather)
            break;
          default:
            console.log("defaulting");
            $('div.clouds').removeClass('hide');
        }
      }

      function addIcon(weather) {
        // for loop to add hide to all div icons children
        var div = document.getElementById('icons');
        var divChildren = div.childNodes; // get an array of child nodes

        for (var i=0; i<divChildren.length; i++) {
            divChildren[i].className += " hide";
        }
        if ($('div.' + weather).hasClass('hide')) {
          $('div.' + weather).removeClass('hide');
          $('.detail-description').text(response.weather[0].description);
        }
      }
      
      var theWeather = response.weather[0].main;
      iconGen(theWeather); //calls function

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
      $('.cloudy').text(response.clouds.all);
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
