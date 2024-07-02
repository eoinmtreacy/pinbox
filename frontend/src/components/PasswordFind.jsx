import React from 'react';
import PasswordImg from '../Images/pw.png';

function PasswordFind() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-start py-10 px-8 mx-auto w-full text-lg font-bold text-center bg-white max-w-[480px] rounded-lg shadow-md text-stone-500">
                <div className="self-center mt-8 tracking-tight text-black text-4xl">Verify</div>
                <img className="self-center mt-6 max-w-full aspect-[0.9] w-[200px]" src={PasswordImg} alt="passwordImg" />
                <form className="w-full mt-8">
                    <div className="mb-4">
                        <div className="mt-3.5 text-xl">Enter your Name</div>
                        <input
                            type="text"
                            id="name"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <div className="mt-3.5 text-xl">Enter your Email</div>
                        <input
                            type="email"
                            id="email"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                </form>

                <button
                    className="justify-center self-center px-5 py-2.5 mt-10 text-white whitespace-nowrap border border-solid bg-indigo-500 border-slate-500 rounded-[30px]"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PasswordFind;
