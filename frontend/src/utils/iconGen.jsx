import L from 'leaflet';
import hateitIcon from '../Images/hateit-marker.png';
import loveitIcon from '../Images/loveit-marker.png';
import OkSign from '../Images/wanna-marker.png';
import DonotCare from '../Images/dontcare-marker.png';

const iconGen = (attitude) => {
    const iconHtml = (iconUrl) => `
        background-image: url(${iconUrl});
        background-size: cover;
        width: 3.5rem;
        height: 3.5rem;
        display: block;
        left: 0rem;
        top: 0rem;
        position: relative;
    `;

    let iconUrl;
    switch (attitude) {
        case 'hate_it':
            iconUrl = hateitIcon;
            break;
        case 'wanna':
            iconUrl = OkSign;
            break;
        case 'love_it':
            iconUrl = loveitIcon;
            break;
        case 'dont_care':
            iconUrl = DonotCare;
            break;
        default:
            iconUrl = DonotCare;
            break;
    }

    return L.divIcon({
        className: 'custom-icon',
        html: `<span style="${iconHtml(iconUrl)}" />`,
    });
};

export default iconGen;
