$(document).ready(function() {

  function getLocation() {
    $.get("http://ipinfo.io", function(location) {
        var city = location.city;
        var country = location.country;
        getPhoto(city);
        getWeather(city + ", " + country);
      }, 'jsonp');;
  }

  function getPhoto(city) {
    var cityLink = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON(cityLink,
      {
          tags: city,
          tagmode: "any",
          format: "json"
      },
      function(data) {
        var rnd = Math.floor(Math.random() * data.items.length);
        if (rnd === 0) {
          console.log("No images to show!");
        }
        var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
        $('html').css('background-image', "url('" + image_src + "')");
    });
  }

  function addIcon(weather) {
    // for loop to add hide to all div icons children
    // addIcon used only in iconGen
    var div = document.getElementById('icons');
    var divChildren = div.childNodes; // get an array of child nodes

    for (var i=0; i<divChildren.length; i++) {
        divChildren[i].className += " hide";
    }
    if ($('div.' + weather).hasClass('hide')) {
      $('div.' + weather).removeClass('hide');
    }
  }

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
      case 'thunderstorm':
        addIcon(weather)
        break;
      default:
        console.log("defaulting");
        $('div.clouds').removeClass('hide');
    }
  }

  function weatherPhoto(weather) {
    var weather = weather.toLowerCase();
    console.log(weather);
    switch (weather) {
      case 'drizzle':
        $('.weather-box').addClass('drizzlez')
        break;
      case 'clouds':
        $('.weather-box').addClass('cloudz')
        break;
      case 'rain':
        $('.weather-box').addClass('rainz')
        break;
      case 'snow':
        $('.weather-box').addClass('snowz')
        break;
      case 'clear':
        $('.weather-box').addClass('clearz')
        break;
      case 'mist':
        $('.weather-box').addClass('mistz')
        break;
      case 'thunderstorm':
        $('.weather-box').addClass('thunderstormz')
        break;
      default:
        console.log("defaulting");
        $('div.clouds').removeClass('hide');
    }
  }

  function getWeather(location) {
    var city = location.split(',')[0];
    var country = location.split(', ')[1];

    var weatherKey = "3d116075e0fe88576d7d105ffb94897e";
    var weatherApiLink = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherKey;

    $.getJSON(weatherApiLink, function(response) {
      // need some error handling...
      $('.locale').text(city);
      var theWeather = response.weather[0].main;
      iconGen(theWeather);
      weatherPhoto(theWeather);

      var theDescription = response.weather[0].description;
      function capitalizeFirst(string) {
          var newDesc = string.charAt(0).toUpperCase() + string.slice(1);
          $('.detail-description').text(newDesc);
      }
      capitalizeFirst(theDescription);


      var tempCel = ((response.main.temp - 273.15).toFixed(2) + " °C");
      var tempFar = ((( response.main.temp - 273.15) * 9/5) + 32).toFixed(2) + " °F";
      //countries where farhenheit
      if (country === "US" ||
          country === "BZ" ||
          country === "KY" ||
          country === "GU" ||
          country === "PR" ||
          country === "PW" ||
          country === "VA") 
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
    }

  getLocation();

  $("#location-choice").on('submit', function (e) {
    var currentCity = e.currentTarget[0].value;
    var currentCountry = e.currentTarget[1].value;
    getPhoto(currentCity);
    getWeather(currentCity + ", " + currentCountry);
    //stop form submission
    e.preventDefault();
  });

}); //doc ready
