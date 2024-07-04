import * as React from 'react';

function LandingSection4() {
    return (
        <section
            id="landing-section-5"
            className="flex flex-col justify-center items-center bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24"
        >
            <div className="flex justify-center items-center px-16 py-20 bg-white max-md:px-5">
                <div className="flex justify-center flex-col items-center mt-10 w-full max-w-[1680px] max-md:max-w-full">
                    <div className="text-7xl font-black tracking-tighter text-zinc-900 max-md:max-w-full max-md:text-4xl">
                        Busyness Heat Map
                    </div>
                    <div className="mt-6 text-2xl tracking-tighter text-black max-w-[800px] w-[800px] max-md:max-w-full text-center">
                        Discover the busyness levels of various areas in Manhattan with our interactive heat map.
                    </div>
                    <div className="flex flex-wrap justify-center self-stretch mt-12 max-md:mt-10 max-md:max-w-full gap-5">
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">Real-time Data</div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Access the latest updates on how busy different areas in Manhattan are, so you can
                                    plan your day effortlessly and avoid the crowds.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">Color-coded Visualization</div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Easily understand the busyness levels with a color-coded map, ranging from green
                                    (less busy) to red (busy).
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">Explore Hidden Gems</div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Discover lesser-known areas that are not overcrowded, allowing you to explore unique
                                    and authentic experiences.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingSection4;
