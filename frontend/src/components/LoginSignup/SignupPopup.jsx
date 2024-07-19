import React, { useState, useEffect } from 'react';

const SignupPopup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-5 rounded-md border border-gray-300 shadow-lg max-w-sm mx-auto">
                <p>{message}</p>
                <div className="text-right mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPopup;
