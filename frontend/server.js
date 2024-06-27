const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 'geojson' 파일 경로를 'preference_sample_data.json'으로 변경
const filePath = path.join(__dirname, 'public', 'preference_sample_data.json');

app.post('/update-preference', (req, res) => {
    const { name, preference } = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read file' });
        }

        let preferences = JSON.parse(data);
        preferences = preferences.map((item) => {
            if (item.name === name) {
                item.preference = preference; // 업데이트 로직 조정
            }
            return item;
        });

        fs.writeFile(filePath, JSON.stringify(preferences, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write file' });
            }
            res.status(200).json({ message: 'Preference updated successfully' });
        });
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
