import * as React from 'react';
function LandingSection6() {
    return (
        <section
            id="landing-section-5"
            className="flex flex-col justify-center items-center bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24"
        >
            <div className="flex flex-col justify-center items-center mt-10 w-full max-w-[1680px]">
                <div className="text-7xl font-black tracking-tighter text-zinc-900 max-md:text-4xl">User Insights</div>
                <div className="mt-6 text-2xl text-center tracking-tighter text-black max-w-[800px] w-full">
                    Emphasizes the valuable insights PinBox offers to users about potential consumer interest.
                </div>
                <div className="flex flex-wrap justify-center content-start self-stretch mt-12 max-md:mt-10 w-full">
                    <div className="flex flex-wrap justify-center gap-5 w-full">
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col grow justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">Effortless Planning</div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Experience seamless planning with PinBox. By promoting venues during less busy
                                    periods, we help you avoid crowds and enjoy a more relaxed and enjoyable visit.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col grow justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">Discover Hidden Gems</div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Uncover lesser-known spots that are just as captivating as popular tourist
                                    destinations. With PinBox, you can explore new places that are less crowded and more
                                    appealing, making your travel experiences unique and memorable.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-3/12 max-md:w-full">
                            <div className="flex flex-col grow justify-center p-6 w-full text-black rounded-xl bg-stone-50 max-w-[610px] max-md:px-5 max-md:mt-1">
                                <div className="text-4xl font-black tracking-tighter">Support Local Communities</div>
                                <div className="mt-3 text-2xl tracking-tighter">
                                    Contribute to the growth of local communities by visiting and supporting hidden gems
                                    and lesser-known places. PinBox highlights these spots, encouraging you to engage
                                    with and uplift local economies.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingSection6;
