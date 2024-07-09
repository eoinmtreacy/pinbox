
import { useState, useEffect } from 'react';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:5165/auth');
                if (!response.ok) {
                    throw new Error('Failed to fetch current user');
                }
                const user = await response.json(); // Parse the JSON from the response
                setCurrentUser(user.pinbox_id);
            } catch (error) {
                console.error("Failed to fetch current user", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return { currentUser, isLoading };
};

export default useCurrentUser;