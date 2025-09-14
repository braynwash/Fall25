// NOTE: The following code pulls JSON data from 80%+ of the API response under the BASIC $0 plan. I get a "freemium" trial for joining until September 28th, but I would like to use this project as a reference and don't want it breaking if it gets graded later down the road, so I'm pulling information that I BELIEVE to be included in the free plan only.

import { getWeather } from "../model/model.js";

function initListeners() {
  $("#getCity").on("click", function () {
    const city = $("#city").val().trim();
    const days = $("#numDays").val();
    if (!city) {
      $(".weatherData").html("<p>Please enter a valid city name!</p>");
      return;
    }

    getWeather(city, days, function (data) {
      if (!data || !data.forecast) {
        $(".weatherData").html("<p>City not found. Please try again!</p>");
        return;
      }

      let html = `
        <div>
            <h2>Weather for ${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
            <p>Latitude: ${data.location.lat}, Longitude: ${data.location.lon}</p>
            <p>Timezone: ${data.location.tz_id}</p>
            <p>Local Time: ${data.location.localtime}</p>
        </div>
      `;

      html += `
      <div class="weatherWrapper">
        <div class="weatherCard">
            <h3>Current Weather</h3>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p>${data.current.condition.text}</p>
            <p>Temperature: ${data.current.temp_c}°C (${data.current.temp_f}°F)</p>
            <p>Feels Like: ${data.current.feelslike_c}°C</p>
            <p>Wind: ${data.current.wind_kph} kph (${data.current.wind_dir})</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Cloud: ${data.current.cloud}%</p>
            <p>UV Index: ${data.current.uv}</p>
            <p>Pressure: ${data.current.pressure_mb} mb</p>
            <p>Visibility: ${data.current.vis_km} km</p>
        </div>
`;

      // Forecast day cards (no hourly breakdown)
      data.forecast.forecastday.forEach((day) => {
        html += `
        <div class="weatherCard">
            <h3>Forecast for ${day.date}</h3>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>${day.day.condition.text}</p>
            <p>High: ${day.day.maxtemp_c}°C, Low: ${day.day.mintemp_c}°C, Avg: ${day.day.avgtemp_c}°C</p>
            <p>Max Wind: ${day.day.maxwind_kph} kph</p>
            <p>Humidity: ${day.day.avghumidity}%</p>
            <p>Chance of Rain: ${day.day.daily_chance_of_rain}%</p>
            <p>Chance of Snow: ${day.day.daily_chance_of_snow}%</p>
            <p>UV Index: ${day.day.uv}</p>
            <h4>Astro</h4>
            <p>Sunrise: ${day.astro.sunrise}, Sunset: ${day.astro.sunset}</p>
            <p>Moonrise: ${day.astro.moonrise}, Moonset: ${day.astro.moonset}</p>
            <p>Moon Phase: ${day.astro.moon_phase}, Illumination: ${day.astro.moon_illumination}%</p>
        </div>
        
  `;
      });

      html += `</div>`; // closes wrapper div

      $(".weatherData").html(html);
    });
  });
}

$(document).ready(function () {
  initListeners();
});
