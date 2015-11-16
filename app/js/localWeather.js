var latitude;
var longitude;
var weatherApiUrl;

var city;
var state;
var temp;
var weatherDescription;
var windSpeed;
var windDirection;

// convert degrees to direction.
function windDirectionConverter(degrees) {
	// conversion table from
	// http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
	// Minnesota Climatology Working Group

	if (degrees >= 348.75 || degrees < 11.25) {
		windDirection = "N";
	}
	else if (11.25 <= degrees && degrees < 33.75) {
		windDirection = "NNE";
	}
	else if (33.75 <= degrees && degrees < 56.25) {
		windDirection = "NE";
	}
	else if (56.25 <= degrees && degrees < 78.75) {
		windDirection = "ENE";
	}
	else if (78.75 <= degrees && degrees < 101.25) {
		windDirection = "E";
	}
	else if (101.25 <= degrees && degrees < 123.75) {
		windDirection = "ESE";
	}
	else if (123.75 <= degrees && degrees < 146.25) {
		windDirection = "SE";
	}
	else if (146.25 <= degrees && degrees < 168.75) {
		windDirection = "SSE";
	}
	else if (168.75 <= degrees && degrees < 191.25) {
		windDirection = "S";
	}
	else if (191.25 <= degrees && degrees < 213.75) {
		windDirection = "SSW";
	}
	else if (213.75 <= degrees && degrees < 236.25) {
		windDirection = "SW";
	}
	else if (236.25 <= degrees && degrees < 258.75) {
		windDirection = "WSW";
	}
	else if (258.75 <= degrees && degrees < 281.25) {
		windDirection = "W";
	}
	else if (281.25 <= degrees && degrees < 303.75) {
		windDirection = "WNW";
	}
	else if (303.75 <= degrees && degrees < 326.25) {
		windDirection = "NW";
	}
	else if (326.25 <= degrees && degrees < 348.75) {
		windDirection = "W";
	}

	return windDirection;
}

// console.log(windDirectionConverter(250));


if (navigator.geolocation) {

	navigator.geolocation.getCurrentPosition(function(position) {
		// console.log(position);
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		// console.log(latitude);
		// console.log(longitude);
		weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat="
		+ latitude + "&lon=" + longitude + "&APPID=7633bce24e83d201aa0190f0052944fa";
		
		// console.log(weatherApiUrl);

		$.getJSON( weatherApiUrl, function( data ) {

			temp = Math.round(data.main.temp) + " degrees F";
			city = data.name;
			windSpeed = data.wind.speed  + " mph";
			windDirection = data.wind.deg;
			weatherDescription = data.weather[0].description;

			console.log(temp);
			console.log(city);
			console.log(windSpeed);
			console.log(windDirectionConverter(windDirection));
			console.log(weatherDescription);

			
			// google reverse geocoding
			// put it inside the weather api callback
			// because it's a nice to have, only worthwhile
			// if the previous call suceeded
			var geocoder = new google.maps.Geocoder;
			var latlng = {lat: latitude, lng: longitude};

			geocoder.geocode({'location': latlng}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					// console.log(results[0].address_components[5].short_name);
					state = results[0].address_components[5].short_name;
					console.log(state);
				} else {
					console.log('Geocoder failed due to: ' + status);
			    }
			});


		});




	});

	

}
 