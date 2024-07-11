
import { useState, useEffect } from 'react';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5165/pingauth")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCurrentUser(data.pinbox_Id);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => setIsLoading(false))
    }, []);

    return { currentUser, isLoading };
};

export default useCurrentUser;