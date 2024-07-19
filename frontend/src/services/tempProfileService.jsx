// src/services/tempProfileService.js

import profilePicture from '../Images/Friends/men/m1.jpg';
import map1 from '../tempmaps/map1.png';
import map2 from '../tempmaps/map2.png';
import map3 from '../tempmaps/map3.png';
import map4 from '../tempmaps/map4.png';

export const getUserData = () => {
    return new Promise((resolve) => {
        const mockUserData = {
            profilePicture: profilePicture,
            name: 'John Doe',
            username: 'johndoe',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula justo vel turpis varius, et volutpat ipsum suscipit.',
            maps: [
                { name: 'Map 1', image: map1 },
                { name: 'Map 2', image: map2 },
                { name: 'Map 3', image: map3 },
                { name: 'Map 4', image: map4 },
            ],
            followers: 123,
            following: 456,
        };

        setTimeout(() => resolve(mockUserData), 1000); // Simulate an API call with a timeout
    });
};
