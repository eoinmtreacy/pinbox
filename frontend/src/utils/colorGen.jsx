export default function colorGen(busyness) {

    // Assuming busyness is between 0 and 2
    const red = Math.min(255, Math.floor((255 * busyness) / 2));
    const blue = 255 - red;
    return `rgb(${red}, 0, ${blue})`;

}
