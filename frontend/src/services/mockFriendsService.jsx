// Import images
import m1 from '../friends/men/m1.jpg';
import m2 from '../friends/men/m2.jpg';
import m3 from '../friends/men/m3.jpg';
import m4 from '../friends/men/m4.jpg';
import m5 from '../friends/men/m5.jpg';
import m6 from '../friends/men/m6.jpg';
import m7 from '../friends/men/m7.jpg';
import m8 from '../friends/men/m8.jpg';
import m9 from '../friends/men/m9.jpg';
import m10 from '../friends/men/m10.jpg';
import m11 from '../friends/men/m11.jpg';
import m12 from '../friends/men/m12.jpg';
import f1 from '../friends/women/f1.jpg';
import f2 from '../friends/women/f2.jpg';
import f3 from '../friends/women/f3.jpg';
import f4 from '../friends/women/f4.jpg';
import f5 from '../friends/women/f5.jpg';
import f6 from '../friends/women/f6.jpg';
import f7 from '../friends/women/f7.jpg';
import f8 from '../friends/women/f8.jpg';
import f9 from '../friends/women/f9.jpg';
import f10 from '../friends/women/f10.jpg';
import f11 from '../friends/women/f11.jpg';
import f12 from '../friends/women/f12.jpg';
import f13 from '../friends/women/f13.jpg';

export const getFriends = async (userId) => {
    // Mock data for friends list with imported images
    const mockFriends = [
        {
            id: 1,
            photoUrl: m1,
            name: 'John Doe',
            location: 'New York, NY',
            distance: 5,
            followerCount: 120,
            pinboxCount: 30,
            isFollowing: true,
        },
        {
            id: 2,
            photoUrl: f1,
            name: 'Jane Smith',
            location: 'Los Angeles, CA',
            distance: 10,
            followerCount: 200,
            pinboxCount: 40,
            isFollowing: false,
        },
        {
            id: 3,
            photoUrl: f2,
            name: 'Alice Johnson',
            location: 'Chicago, IL',
            distance: 8,
            followerCount: 150,
            pinboxCount: 25,
            isFollowing: true,
        },
        {
            id: 4,
            photoUrl: m2,
            name: 'Bob Brown',
            location: 'San Francisco, CA',
            distance: 12,
            followerCount: 180,
            pinboxCount: 35,
            isFollowing: false,
        },
        {
            id: 5,
            photoUrl: m3,
            name: 'Charlie Davis',
            location: 'Austin, TX',
            distance: 7,
            followerCount: 220,
            pinboxCount: 28,
            isFollowing: true,
        },
        {
            id: 6,
            photoUrl: f3,
            name: 'Dana Evans',
            location: 'Seattle, WA',
            distance: 9,
            followerCount: 140,
            pinboxCount: 22,
            isFollowing: false,
        },
        {
            id: 7,
            photoUrl: f4,
            name: 'Eve Foster',
            location: 'Denver, CO',
            distance: 6,
            followerCount: 130,
            pinboxCount: 20,
            isFollowing: true,
        },
        {
            id: 8,
            photoUrl: m4,
            name: 'Frank Green',
            location: 'Boston, MA',
            distance: 11,
            followerCount: 170,
            pinboxCount: 45,
            isFollowing: false,
        },
        {
            id: 9,
            photoUrl: f5,
            name: 'Grace Harris',
            location: 'Miami, FL',
            distance: 4,
            followerCount: 160,
            pinboxCount: 50,
            isFollowing: true,
        },
        {
            id: 10,
            photoUrl: m5,
            name: 'Hank Johnson',
            location: 'Phoenix, AZ',
            distance: 14,
            followerCount: 190,
            pinboxCount: 60,
            isFollowing: false,
        },
        {
            id: 11,
            photoUrl: f6,
            name: 'Ivy King',
            location: 'Las Vegas, NV',
            distance: 3,
            followerCount: 110,
            pinboxCount: 15,
            isFollowing: true,
        },
        {
            id: 12,
            photoUrl: m6,
            name: 'Jack Lee',
            location: 'Portland, OR',
            distance: 8,
            followerCount: 100,
            pinboxCount: 12,
            isFollowing: false,
        },
        {
            id: 13,
            photoUrl: f7,
            name: 'Kate Miller',
            location: 'Dallas, TX',
            distance: 5,
            followerCount: 140,
            pinboxCount: 30,
            isFollowing: true,
        },
        {
            id: 14,
            photoUrl: m7,
            name: 'Leo Nelson',
            location: 'San Diego, CA',
            distance: 10,
            followerCount: 150,
            pinboxCount: 25,
            isFollowing: false,
        },
        {
            id: 15,
            photoUrl: f8,
            name: 'Mia Owens',
            location: 'San Jose, CA',
            distance: 7,
            followerCount: 130,
            pinboxCount: 18,
            isFollowing: true,
        },
        {
            id: 16,
            photoUrl: m8,
            name: 'Noah Perez',
            location: 'Houston, TX',
            distance: 12,
            followerCount: 120,
            pinboxCount: 40,
            isFollowing: false,
        },
        {
            id: 17,
            photoUrl: f9,
            name: 'Olivia Quinn',
            location: 'Philadelphia, PA',
            distance: 9,
            followerCount: 115,
            pinboxCount: 27,
            isFollowing: true,
        },
        {
            id: 18,
            photoUrl: m9,
            name: 'Paul Roberts',
            location: 'Columbus, OH',
            distance: 6,
            followerCount: 105,
            pinboxCount: 35,
            isFollowing: false,
        },
        {
            id: 19,
            photoUrl: f10,
            name: 'Quinn Scott',
            location: 'Charlotte, NC',
            distance: 8,
            followerCount: 110,
            pinboxCount: 22,
            isFollowing: true,
        },
        {
            id: 20,
            photoUrl: m10,
            name: 'Ryan Taylor',
            location: 'Detroit, MI',
            distance: 11,
            followerCount: 125,
            pinboxCount: 32,
            isFollowing: false,
        },
        {
            id: 21,
            photoUrl: f11,
            name: 'Sophia Walker',
            location: 'Memphis, TN',
            distance: 4,
            followerCount: 135,
            pinboxCount: 29,
            isFollowing: true,
        },
        {
            id: 22,
            photoUrl: m11,
            name: 'Thomas Young',
            location: 'Fort Worth, TX',
            distance: 13,
            followerCount: 140,
            pinboxCount: 31,
            isFollowing: false,
        },
        {
            id: 23,
            photoUrl: f12,
            name: 'Uma Zimmerman',
            location: 'El Paso, TX',
            distance: 6,
            followerCount: 115,
            pinboxCount: 20,
            isFollowing: true,
        },
        {
            id: 24,
            photoUrl: m12,
            name: 'Victor Adams',
            location: 'Nashville, TN',
            distance: 9,
            followerCount: 120,
            pinboxCount: 33,
            isFollowing: false,
        },
        {
            id: 25,
            photoUrl: f13,
            name: 'Wendy Brooks',
            location: 'Louisville, KY',
            distance: 8,
            followerCount: 130,
            pinboxCount: 21,
            isFollowing: true,
        },
    ];

    // Simulate an async operation using a Promise
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockFriends);
        }, 500);
    });
};

export const getFriendDetails = async (friendId) => {
    // Mock data for a friend's details
    const mockFriendDetails = {
        id: friendId,
        name: friendId === 1 ? 'John Doe' : friendId === 2 ? 'Jane Smith' : friendId === 3 ? 'Alice Johnson' : `Friend ${friendId}`,
        position: 'Software Engineer',
        email: `friend${friendId}@example.com`,
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        city: friendId === 1 ? 'New York, NY' : friendId === 2 ? 'Los Angeles, CA' : friendId === 3 ? 'Chicago, IL' : 'City, State',
    };

    // Simulate an async operation using a Promise
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockFriendDetails);
        }, 500);
    });
};
