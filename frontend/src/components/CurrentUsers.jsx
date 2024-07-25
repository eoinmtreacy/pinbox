import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure this import is present


const CurrentUsers = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('/backend/User/all-user-profiles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfiles(data["$values"]);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfiles();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (profiles.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            {profiles.map(profile => (
                <div key={profile.userId} style={styles.card}>
                    <img
                        src={`/${profile.profileImageUrl || 'userProfilePhoto.png'}`}
                        alt={`${profile.userId}'s profile`}
                        style={styles.image}
                    />
                    <Link to={`/profile/${profile.userId}`} style={styles.nameLink}>
                        <h3 style={styles.name}>{profile.userId}</h3>
                    </Link>
                    <p style={styles.bio}>{profile.bio}</p>
                </div>
            ))}
        </div>
    );
};


const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Creates 3 equal-width columns
        gap: '20px',
        padding: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        boxSizing: 'border-box', // Ensures padding and border are included in the element's total width and height
    },
    image: {
        maxWidth: '100%',
        borderRadius: '50%',
    },
    name: {
        fontSize: '24px', // Increase the font size here
        fontWeight: 'bold', // Optional: make the font bold
        margin: '16px 0 8px',
    },
    bio: {
        color: '#555',
    },
    nameLink: {
        textDecoration: 'none',
        color: 'inherit', // Ensures the text color is consistent with the rest of the text
    }
};

export default CurrentUsers;
