import React, { useState, useEffect } from 'react';

const CookieModal = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setShowModal(true);
        }
    }, []);

    const handleConsent = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-5 rounded-md border border-gray-300 shadow-lg max-w-sm mx-auto">
                <p>
                    This site uses cookies to improve your experience. To continue using the site, please accept cookies
                    to continue using the site.
                </p>
                <div className="text-right mt-4">
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