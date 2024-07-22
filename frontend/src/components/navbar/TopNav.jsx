import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthContext';

import timeIcon from '../../Images/time.png';
import distanceIcon from '../../Images/distance.png';
import TimeSlider from './navbar_components/TimeSlider';
import DistanceSlider from './navbar_components/DistanceSlider';
import SearchBar from './navbar_components/SearchBar';
import showPinsIcon from '../../Images/pin.png';
import hidePinsIcon from '../../Images/pin-x.png';
import ProfileRegister from './navbar_components/ProfileRegister';
import DaySelect from './navbar_components/DaySelect';

const TopNav = ({
    priorityPin,
    setPriorityPin,
    timeStamp,
    setTimeStamp,
    distance,
    setDistance,
    showPins,
    setShowPins,
    day,
    setDay,
    handleLoginLogoutClick
}) => {

    const { user } = useAuthContext();
    const { pinbox_id } = useParams();

    const navigate = useNavigate(); // Use useNavigate to navigate programmatically

    return (
        <div className="w-full bg-white flex justify-between items-center p-2 shadow-md top-nav">
            <div className="flex items-center space-x-4">
                <SearchBar priorityPin={priorityPin} setPriorityPin={setPriorityPin} />
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center mx-2">
                    <span className="text-gray-700 text-xs mb-1">Time</span>
                    <img src={timeIcon} alt="Time Icon" className="w-6 h-6 mb-1" />
                    <TimeSlider timeStamp={timeStamp} setTimeStamp={setTimeStamp} />
                </div>

                <div className="flex flex-col items-center mx-2">
                    <span className="text-gray-700 text-xs mb-1">Distance</span>
                    <img src={distanceIcon} alt="Distance Icon" className="w-6 h-6 mb-1" />
                    <DistanceSlider distance={distance} setDistance={setDistance} />
                </div>

                <img src={showPins ? hidePinsIcon : showPinsIcon} alt="Pins Icon" className="w-8 h-8" onClick={() => setShowPins(!showPins)} />
            </div>

            <div className="flex items-center space-x-4">


                <div className="flex items-center space-x-2">
                    <DaySelect day={day} setDay={setDay} />
                </div>
                
                {/* either display profile or sign up link */}
                <ProfileRegister />

               <button
                    onClick={handleLoginLogoutClick}
                    className="text-xs bg-blue-500 text-white rounded p-1"
                >
                    {user != null ? 'Logout' : 'Login'}
                </button>

            </div>
        </div>
    );
};

TopNav.propTypes = {
    timeStamp: PropTypes.number.isRequired,
    setTimeStamp: PropTypes.func.isRequired,
    distance: PropTypes.number.isRequired,
    setDistance: PropTypes.func.isRequired,
    showPins: PropTypes.bool.isRequired,
    setShowPins: PropTypes.func.isRequired,
    day: PropTypes.number.isRequired,
    setDay: PropTypes.func.isRequired
};

export default TopNav;
