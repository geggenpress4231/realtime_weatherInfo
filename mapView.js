
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.6532, lng: -79.3832 }, // Toronto coordinates

    zoom: 8,
  });

  fetch(`https://api.openweathermap.org/data/2.5/find?q=Cleveland&cnt=20&units=metric&lang=fr&appid=key`)
  .then(response => response.json())
  .then(data => {
    // Loop through the list of cities and create a marker for each city
    data.list.forEach(city => {
      const marker = new google.maps.Marker({
        position: { lat: city.coord.lat, lng: city.coord.lon },
        map,
        title: city.name,
      });

      // Create an info window for the marker
      const infoWindow = new google.maps.InfoWindow({
        
        content: `
          <div>
          <img src="http://openweathermap.org/img/w/${city.weather[0].icon}.png" alt="Weather Icon">

            <h2>${city.name}</h2>
            <p>Temperature: ${city.main.temp}&deg;C</p>
            <p>Feels Like: ${city.main.feels_like}&deg;C</p>
            <p>Description: ${city.weather[0].description}</p>
          </div>
        `,
      });

      // Add a click event listener to the marker
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
