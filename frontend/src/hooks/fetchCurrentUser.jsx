
import { useState, useEffect } from 'react';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:5165/User/auth');
                if (!response.ok) {
                    let errorMsg = 'Failed to fetch current user';
                    try {
                        const errorData = await response.json(); // Assuming the error message is in JSON format
                        errorMsg += `: ${errorData.message}`; // Append the error message from the server
                    } catch (e) {
                        // If reading the error message fails, use the status text
                        errorMsg += `: ${response.statusText}`;
                    }
                    throw new Error(`${errorMsg} (Status: ${response.status})`);
                }
                const user = await response.json(); // Parse the JSON from the response
                console.log(user);
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