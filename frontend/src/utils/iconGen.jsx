import L from 'leaflet';

const iconGen = ((attitude) => {
    const iconHtmlStyles = (color) => `
            background-color: ${color};
            width: 2rem;
            height: 2rem;
            display: block;
            left: -1rem;
            top: -1rem;
            position: relative;
            border-radius: 1rem 1rem 0;
            transform: rotate(45deg);
            border: 1px solid #FFFFFF`;

    let color;
    switch (attitude) {
        case 'hate it':
            color = 'red';
            break;
        case 'wanna':
            color = 'blue';
            break;
        case 'love it':
            color = 'green';
            break;
        default:
            color = 'gray';
            break;
    }

    return L.divIcon({
        className: 'custom-icon',
        html: `<span style="${iconHtmlStyles(color)}" />`,
    });
});

export default iconGen;