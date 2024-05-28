// map.js

var map = L.map('map').setView([40.7831, -73.9712], 13); // New York Manhattan coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Make AJAX request to Flask server to get bench locations from CSV file
fetch('/get_bench_locations')
  .then(response => response.json())
  .then(data => {
    // Add markers for each bench location
    data.forEach(function(benchLocation, index) {
      var benchMarker = L.marker([benchLocation._lat, benchLocation._lon]).addTo(map);
      benchMarker.bindPopup('Bench ' + (index + 1));
    });
  })
  .catch(error => console.error('Error fetching bench locations:', error));

