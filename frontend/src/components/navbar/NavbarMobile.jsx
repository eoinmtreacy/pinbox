import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TimeSlider from './navbar_components/TimeSlider';
import DistanceSlider from './navbar_components/DistanceSlider';
import SearchBar from './navbar_components/SearchBar';
import ProfileRegister from './navbar_components/ProfileRegister';
import DaySelect from './navbar_components/DaySelect';
import LoginLogout from './navbar_components/LoginLogout';

import timeIcon from '../../Images/time.png';
import distanceIcon from '../../Images/distance.png';
import showPinsIcon from '../../Images/pin.png';
import hidePinsIcon from '../../Images/pin-x.png';
import searchIcon from '../../Images/search.png';

const NavbarMobile = ({
    priorityPin,
    setPriorityPin,
    timeStamp,
    setTimeStamp,
    distance,
    setDistance,
    showPins,
    setShowPins,
    day,
    setDay
}) => {
    const [showTimeSlider, setShowTimeSlider] = useState(false);
    const [showDistanceSlider, setShowDistanceSlider] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <>
            <div className="mobile-icons flex items-center justify-between">
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowSearchBar(!showSearchBar);
                            setShowTimeSlider(false);
                            setShowDistanceSlider(false);
                        }}
                        aria-label="Toggle Search Bar"
                    >
                        <img src={searchIcon} alt="Search Icon" className="w-8 h-8" />
                    </button>
                </div>
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowTimeSlider(!showTimeSlider);
                            setShowDistanceSlider(false);
                            setShowSearchBar(false);
                        }}
                        aria-label="Toggle Time Slider"
                    >
                        <img src={timeIcon} alt="Time Icon" className="w-8 h-8" />
                    </button>
                </div>
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowDistanceSlider(!showDistanceSlider);
                            setShowTimeSlider(false);
                            setShowSearchBar(false);
                        }}
                        aria-label="Toggle Distance Slider"
                    >
                        <img src={distanceIcon} alt="Distance Icon" className="w-8 h-8" />
                    </button>
                </div>
                <button
                    onClick={() => setShowPins(!showPins)}
                    aria-label={showPins ? "Hide Pins" : "Show Pins"}
                >
                    <img src={showPins ? hidePinsIcon : showPinsIcon} alt="Pins Icon" className="w-8 h-8" />
                </button>
                <DaySelect day={day} setDay={setDay} />
                <ProfileRegister />
                <LoginLogout />
            </div>
            <div className="mobile-interactives absolute top-14">
                {showSearchBar && (
                    <SearchBar priorityPin={priorityPin} setPriorityPin={setPriorityPin} />
                )}
                {showTimeSlider && (
                    <TimeSlider timeStamp={timeStamp} setTimeStamp={setTimeStamp} />
                )}
                {showDistanceSlider && (
                    <DistanceSlider distance={distance} setDistance={setDistance} />
                )}
            </div>
        </>
    );
};

NavbarMobile.propTypes = {
    priorityPin: PropTypes.string.isRequired,
    setPriorityPin: PropTypes.func.isRequired,
    timeStamp: PropTypes.number.isRequired,
    setTimeStamp: PropTypes.func.isRequired,
    distance: PropTypes.number.isRequired,
    setDistance: PropTypes.func.isRequired,
    showPins: PropTypes.bool.isRequired,
    setShowPins: PropTypes.func.isRequired,
    day: PropTypes.number.isRequired,
    setDay: PropTypes.func.isRequired
};

export default NavbarMobile;
