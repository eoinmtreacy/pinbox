import os
from flask import request, jsonify, send_from_directory, render_template
from app import app
from app.process import process_data
import csv

# default main route
@app.route('/')
def index():
    return render_template('map.html')

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    result = process_data(data)
    return jsonify(result)

# Optional: web browsers often request a favicon.ico and sometimes other icons 
#(such as apple-touch-icon.png) when visiting a site. These icons are used for various purposes, 
#such as displaying a small icon in the browser tab, bookmarks, or on the home screen of a mobile device.

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )

@app.route('/apple-touch-icon.png')
@app.route('/apple-touch-icon-precomposed.png')
def apple_touch_icon():
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        'apple-touch-icon.png'
    )

@app.route('/get_bench_locations')
def get_bench_locations():
    bench_locations = []
    with open('data/benches.csv', 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            lat_str = row.get('_lat', '')
            lon_str = row.get('_lon', '')
            if lat_str and lon_str:  # Check if both lat and lon are non-empty
                try:
                    lat = float(lat_str)
                    lon = float(lon_str)
                    bench_locations.append({'_lat': lat, '_lon': lon})
                except ValueError:
                    # Handle invalid float conversion
                    pass
    return jsonify(bench_locations)