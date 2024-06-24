import * as React from 'react';
import SamplePhoto from '../Images/preferenceSample.png';
import Phone from '../Images/phone.png';
import Money from '../Images/money.png';
import Clock from '../Images/clock.png';
import Flag from '../Images/hateit.png';
import Heart from '../Images/loveit.png';
import OkSign from '../Images/wanna.png';
import DonotCare from '../Images/dontcare.png';
import PropTypes from 'prop-types';


const StarRating = ({ rating }) => {
    const MAX_STARS = 5;
    const fullStar = '★';
    const emptyStar = '☆';

    return (
        <div className="flex">
            {Array.from({ length: MAX_STARS }, (_, index) => (
                <span key={index} className="text-yellow-500 text-2xl">
                    {index < rating ? fullStar : emptyStar}
                </span>
            ))}
        </div>
    );
};

function Preference() {
    return (
        <div className="flex flex-col items-center  min-h-screen bg-gray-100 mr-0 mb-0">
            <div className="flex flex-col  px-7 pt-10 bg-white rounded-xl border border-solid border-stone-400 max-w-[618px] max-md:px-5">
                <div className="text-4xl font-bold tracking-tight text-center text-black max-md:max-w-full">
                    Smart Recommendation
                </div>
                <div className="flex flex-col  p-5">
                    <img src={SamplePhoto} alt="SamplePhoto" className="max-w-full h-auto rounded-lg" />
                    <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg mt-[-40px] w-full max-w-[500px] text-white">
                        <div className="text-2xl font-bold">Scallywag's</div>
                        <div className="text-lg">pub</div>
                        <div className="text-base">508 9th Ave, New York, NY 10018, United States</div>
                    </div>
                </div>
                <div className="flex gap-2 mt-6 text-xl leading-7 text-black">
                    <StarRating rating={3} className="shrink-0 max-w-full aspect-[4.17] w-[189px]" />
                    <div className="flex-auto my-auto">See more reviews</div>
                </div>
                <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                    <img src={Phone} className="aspect-[0.94] w-[47px]" alt="Phone" />
                    <div className="flex-auto my-auto">XXXXXXXXXXX</div>
                </div>
                <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                    <img src={Clock} className="aspect-[0.94] w-[47px]" alt="Clock" />
                    <div className="flex-auto my-auto">Open - Closes 12 am</div>
                </div>
                <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                    <img src={Money} className="aspect-[0.94] w-[47px]" alt="Money" />
                    <div className="flex-auto my-auto">€~€€</div>
                </div>
                <div className="flex gap-5 mt-1.5 text-xl leading-7 text-black whitespace-nowrap">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cd84b25e3fffef0b5991cd70a6ef4fe5555c08a1a67a9cf3dac60311c18b4af?"
                        className="shrink-0 aspect-[1.12] w-[57px]"
                        alt="Social Media"
                    />
                    <div className="flex-auto my-auto">Social Media</div>
                </div>
                <div className="self-center mt-5 w-full max-w-[522px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                            <img
                                src={Flag}
                                className="shrink-0 mx-auto rounded-full aspect-square h-[100px] w-[100px] max-md:mt-10"
                                alt="Hate it"
                            />
                        </div>
                        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                            <img
                                src={DonotCare}
                                className="shrink-0 mx-auto rounded-full aspect-square h-[100px] w-[100px] max-md:mt-10"
                                alt="Don't care"
                            />
                        </div>
                        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                            <img
                                src={OkSign}
                                className="shrink-0 mx-auto rounded-full aspect-square h-[100px] w-[100px] max-md:mt-10"
                                alt="Wanna"
                            />
                        </div>
                        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                            <img
                                src={Heart}
                                className="shrink-0 mx-auto rounded-full aspect-square h-[100px] w-[100px] max-md:mt-10"
                                alt="Love it"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


StarRating.propTypes = {
    rating: PropTypes.number.isRequired
};


export default Preference;