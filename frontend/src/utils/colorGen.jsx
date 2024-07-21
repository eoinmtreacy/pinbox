export default function colorGen(busyness) {
    if (busyness < 0.25) {
        return 'blue';
    } else if (busyness < 0.5) {
        return 'green';
    } else if (busyness < 0.75) {
        return 'yellow';
    } else {
        return 'red';
    }
}