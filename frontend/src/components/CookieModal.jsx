import React, { useState, useEffect } from 'react';

const CookieModal = () => {
    // State to control the visibility of the modal
    const [showModal, setShowModal] = useState(false);

    // Effect hook to check cookie consent on component mount
    useEffect(() => {
        // Check if cookie consent is stored in localStorage
        const cookieConsent = localStorage.getItem('cookieConsent');
        // If no consent is found, show the modal
        if (!cookieConsent) {
            setShowModal(true);
        }
    }, []);

    // Function to handle user consent
    const handleConsent = () => {
        // Store user consent in localStorage
        localStorage.setItem('cookieConsent', 'true');
        // Hide the modal
        setShowModal(false);
    };

    // If modal is not to be shown, return null to render nothing
    if (!showModal) return null;

    return (
        // Modal container, fixed to cover the entire viewport
        <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* Modal content */}
            <div className="bg-white p-5 rounded-md border border-gray-300 shadow-lg max-w-sm mx-auto">
                <p>
                    This site uses cookies to improve your experience. To continue using the site, please accept cookies.
                </p>
                <div className="text-right mt-4">
                    {/* Button to accept cookies and close the modal */}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleConsent}
                    >
                        Agree
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieModal;