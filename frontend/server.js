const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const geojsonFilePath = path.join(__dirname, 'public', 'preference_sample_pin_data.geojson');

// Endpoint to get filtered GeoJSON data
app.get('/fetch-pins', (req, res) => {
    console.log('Reached to the endpoint');
    fs.readFile(geojsonFilePath, 'utf8', (err, data) => {
        console.log('in the function');
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file', details: err.message });
        }
        let geojsonData = JSON.parse(data);

        // Filter features where preference is not 'default'
        geojsonData.features = geojsonData.features.filter((feature) => feature.properties.preference !== 'default');

        res.json(geojsonData);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
