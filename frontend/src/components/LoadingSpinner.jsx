import React, { useEffect, useState, useMemo } from 'react';
import Logo from '../Images/logo.png';

const LoadingSpinner = () => {
    const [fact, setFact] = useState('');

    const facts = useMemo(async () => {
        try {
            const response = await fetch('/RandomLoadingFact.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching the random facts:', error);
            return [];
        }
    }, []);

    useEffect(() => {
        const getRandomFact = async () => {
            const factsArray = await facts;
            if (factsArray.length > 0) {
                const randomIndex = Math.floor(Math.random() * factsArray.length);
                setFact(factsArray[randomIndex]);
            }
        };
        getRandomFact();
    }, [facts]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="spinner-border inline-block w-20px h-20px relative">
                <img
                    src={Logo}
                    className="animate-spin-horizontal"
                    alt="Pinbox"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
            <span className="flex items-center visually-hidden mt-2 font-bold text-xl">{fact}</span>
        </div>
    );
};

export default LoadingSpinner;
