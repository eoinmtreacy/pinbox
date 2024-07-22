export default function colorGen(busyness) {
    if (busyness < 0.25) {
        return '#1f77b4';
    } else if (busyness < 0.5) {
        return '#ffbf00';
    } else if (busyness < 0.75) {
        return '#fc6a03';
    } else {
        return 'red';
    }
}