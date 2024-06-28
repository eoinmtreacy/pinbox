const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(bodyParser.json());

// Serve static files (including preference_sample_data.geojson)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to update preference_sample_data.geojson
app.post('/update_preference', async (req, res) => {
    const { name, preference } = req.body;

    try {
        // Read current geojson file
        const geojsonPath = path.join(__dirname, 'public', 'preference_sample_data.geojson');
        const geojsonContent = await fs.readFile(geojsonPath, 'utf8');
        const geojson = JSON.parse(geojsonContent);

        // Update the feature with matching name
        geojson.features.forEach((feature) => {
            if (feature.properties.name === name) {
                feature.properties.preference = preference;
            }
        });

        // Write updated geojson back to file
        await fs.writeFile(geojsonPath, JSON.stringify(geojson, null, 2));

        res.status(200).json({ message: 'Preference updated successfully' });
    } catch (error) {
        console.error('Error updating preference:', error);
        res.status(500).json({ message: 'Failed to update preference' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
