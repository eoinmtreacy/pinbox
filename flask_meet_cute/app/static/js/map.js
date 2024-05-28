// map.js

// L. is an indicator that we are using leaflet.js
var map = L.map('map').setView([40.7831, -73.9712], 13); // New York Manhattan coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Make AJAX request to Flask server to get bench locations from CSV file
fetch('/get_bench_locations')
  .then(response => response.json())
  .then(data => {
    // Store bench locations in the variable
    var benchLocations = data;

    // Add markers for each bench location
    benchLocations.forEach(function(benchLocation, index) {
      var benchMarker = L.marker([benchLocation._lat, benchLocation._lon]).addTo(map);
      benchMarker.bindPopup('Bench ' + (index + 1));
    });

    // Enable user interaction to select a location
    map.on('click', function(e) {
      var selectedLocation = e.latlng; // Selected location coordinates
      
      // Calculate distance between selected location and each bench location
      var filteredBenches = benchLocations.filter(function(bench) {
          var distance = map.distance(selectedLocation, [bench._lat, bench._lon]);
          return distance <= 1609.34; // 1 mile in meters
      });
      
      // Clear existing markers
      map.eachLayer(function(layer) {
          if (layer instanceof L.Marker) {
              map.removeLayer(layer);
          }
      });
      
      // Display filtered benches on the map
      filteredBenches.forEach(function(bench, index) {
          var benchMarker = L.marker([bench._lat, bench._lon]).addTo(map);
          benchMarker.bindPopup('Bench ' + (index + 1));
      });
    });
  })
  .catch(error => console.error('Error fetching bench locations:', error));
