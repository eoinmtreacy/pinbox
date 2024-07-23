import React from "react";

const DaySelect = ({ day, setDay }) => {
    return (
        <select
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
            className="bg-white border border-gray-300 rounded p-1 text-xs"
        >
            {['Today', 'Tommorow', 'Day After Tommorow'].map((day, index) => (
                <option key={index} value={index}>{day}</option>
            ))}
        </select>
    )
}

export default DaySelect;