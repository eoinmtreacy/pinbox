import React from 'react';
import Loginimg from '../Images/appimage.png';

function Signup() {
    return (
        <div className="container px-4">
            <h1 className="text-center text-2xl font-bold my-4">Sign up</h1>
            <div className="max-w-sm mx-auto p-8 border rounded-lg border border-solid border-[#020202]">
                <img src={Loginimg} alt="Loginimg" className="mx-auto" />
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
