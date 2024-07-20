import React from 'react';

const Settings = () => {
    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-4">Settings</h1>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Change Password</h2>
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="current-password">Current Password</label>
                        <input type="password" id="current-password" className="p-2 border border-gray-300 rounded mb-2" />
                        <label className="mb-1" htmlFor="new-password">New Password</label>
                        <input type="password" id="new-password" className="p-2 border border-gray-300 rounded mb-2" />
                        <label className="mb-1" htmlFor="confirm-password">Confirm New Password</label>
                        <input type="password" id="confirm-password" className="p-2 border border-gray-300 rounded mb-2" />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Change Password</button>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Account</h2>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
