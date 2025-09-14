export function getWeather(city, days, callback) {
  const apiKey = "67580091cb7b499baf861804251409";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&days=${days}&aqi=no&alerts=no`;
  console.log("Getting weather from", url);

  $.getJSON(url, (data) => {
    callback(data);
  }).fail(() => {
    callback(null);
  });
}
