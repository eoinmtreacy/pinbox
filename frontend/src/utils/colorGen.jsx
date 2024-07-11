export default function colorGen(busyness) {
    if (busyness < 0 || busyness > 2) {
        throw new Error('Busyness must be between 0 and 2');
    }

    let red,
        green,
        blue = 0;

    if (busyness <= 0.5) {
        // Okay
        red = Math.min(255, Math.floor((255 * (0.5 - busyness)) / 0.5));
        green = 255;
    } else if (busyness <= 1) {
        // little busy
        red = 255;
        green = Math.min(165, Math.floor(165 - (busyness - 0.5) * 330));
    } else if (busyness <= 1.5) {
        // busy
        red = 255;
        green = 255;
    } else {
        // Very busy
        red = 255;
        green = Math.min(255, Math.floor(255 - (busyness - 1.5) * 510));
    }

    return `rgb(${red}, ${green}, ${blue})`;
}
