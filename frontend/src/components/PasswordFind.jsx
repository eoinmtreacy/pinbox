import * as React from 'react';
import PasswordImg from '../Images/pw.png';

function PasswordFind() {
    return (
        <div className="flex flex-col items-start py-20 pr-9 pl-20 mx-auto w-full max-w-md text-4xl font-bold text-center bg-white rounded-2xl text-stone-500">
            {/* Heading */}
            <div className="self-center mt-12 tracking-tight text-black">Verify</div>
            {/* Image */}
            <img className="self-center mt-6 w-full max-w-xs aspect-auto" src={PasswordImg} alt="passwordImg" />
            {/* Form */}
            <form className="w-full mt-6">
                {/* Name Input */}
                <div className="mb-4">
                    <label htmlFor="name" className="block mt-3.5 text-xl">
                        Enter your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>
                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block mt-3.5 text-xl">
                        Enter your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>
                {/* Submit Button */}
                <button
                    className="w-full px-5 py-2.5 mt-8 text-white bg-indigo-500 rounded-lg"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PasswordFind;