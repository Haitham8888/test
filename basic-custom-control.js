(function () {
    var container = this.container;
    container.innerHTML = ""; // Clear any existing content

    // Create a map container and style it
    var mapDiv = document.createElement("div");
    mapDiv.style.height = "500px"; // Set the map height
    mapDiv.style.width = "100%"; // Set the map width
    container.appendChild(mapDiv);

    // Initialize the map (centered on a default latitude and longitude)
    var map = L.map(mapDiv).setView([51.505, -0.09], 13); // Default center (London, adjust if necessary)

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Loop through the data rows and place markers on the map
    if (this.data && this.data.rows) {
        this.data.rows.forEach(function (row) {
            var lat = row[0].value;  // Assuming first data item is latitude
            var lon = row[1].value;  // Assuming second data item is longitude
            var name = row[2].value; // Assuming third data item is name or description

            // Add marker for each row of data
            if (lat && lon) {
                L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(name || "No description");
            }
        });
    }
})();
