import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import TimeSlider from './navbar_components/TimeSlider';
import DistanceSlider from './navbar_components/DistanceSlider';
import SearchBar from './navbar_components/SearchBar';
import { useAuthContext } from '../../auth/AuthContext';

import timeIcon from '../../Images/time.png';
import distanceIcon from '../../Images/distance.png';
import showPinsIcon from '../../Images/pin.png';
import hidePinsIcon from '../../Images/pin-x.png';
import searchIcon from '../../Images/search.png'; // Import the search icon
import ProfileRegister from './navbar_components/ProfileRegister';
import DaySelect from './navbar_components/DaySelect';
import LoginLogout from './navbar_components/LoginLogout';


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
    const [showSearchBar, setShowSearchBar] = useState(false); // State for search bar visibility

    return (
        <div className="mobile-icons flex items-center justify-between">
            <div className="relative">
                <img src={searchIcon} alt="Search Icon" className="w-8 h-8" onClick={() => setShowSearchBar(!showSearchBar)} />
                {showSearchBar && (
                    <SearchBar priorityPin={priorityPin} setPriorityPin={setPriorityPin} />
                )}
            </div>
            <div className="relative">
                <img src={timeIcon} alt="Time Icon" className="w-8 h-8" onClick={() => setShowTimeSlider(!showTimeSlider)} />
                {showTimeSlider && (
                    <TimeSlider timeStamp={timeStamp} setTimeStamp={setTimeStamp} />
                )}
            </div>
            <div className="relative">
                <img src={distanceIcon} alt="Distance Icon" className="w-8 h-8" onClick={() => setShowDistanceSlider(!showDistanceSlider)} />
                {showDistanceSlider && (
                   <DistanceSlider distance={distance} setDistance={setDistance} /> 
                )}
            </div>
            <img src={showPins ? hidePinsIcon : showPinsIcon} alt="Pins Icon" className="w-8 h-8" onClick={() => setShowPins(!showPins)} />
                <DaySelect day={day} setDay={setDay} />
                <ProfileRegister /> 
                <LoginLogout />


        </div>
    );
};

NavbarMobile.propTypes = {
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
