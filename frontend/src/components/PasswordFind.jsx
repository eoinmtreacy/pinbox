import * as React from 'react';
import PasswordImg from '../Images/pw.png';

function PasswordFind() {
    return (
        <div className="flex flex-col items-start py-20 pr-9 pl-20 mx-auto w-full text-4xl font-bold text-center bg-white max-w-[480px] rounded-[80px] text-stone-500">
            <div className="self-center mt-12 tracking-tight text-black">Verify</div>
            <img className="self-center mt-6 max-w-full aspect-[0.9] w-[289px]" src={PasswordImg} alt="passwordImg" />
            <form>
                <div className="mb-4">
                    <div className="mt-3.5 text-xl">Enter your Name</div>
                    <input
                        type="name"
                        id="name"
                        className="border rounded w-full py-2 px-3 text-grey-darker"
                        required
                    />
                </div>

                <div className="mb-4">
                    <div className="mt-3.5 text-xl">Enter your Email</div>
                    <input
                        type="name"
                        id="name"
                        className="border rounded w-full py-2 px-3 text-grey-darker"
                        required
                    />
                </div>
            </form>

            <button
                className="justify-center self-center px-5 py-2.5 mt-14 text-white whitespace-nowrap border border-solid bg-indigo-500 border-slate-500 rounded-[30px]"
                type="submit"
            >
                Submit
            </button>
        </div>
    );
}
export default PasswordFind;