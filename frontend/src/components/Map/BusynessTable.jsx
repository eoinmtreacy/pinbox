import React from 'react';

const BusynessModal = ({ isOpen, onRequestClose, busyness }) => {
    return (
        <div className="buynessta flex flex-col bg-white rounded-2xl border border-solid border-stone-400 max-w-xs p-5 bg-opacity-80">
            <div className="text-3xl font-bold text-center text-black mb-1">Busyness Level</div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Busyness Value</th>
                        <th className="border px-4 py-2">Colour & Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ backgroundColor: '#1f77b4' }}>
                        <td className="border px-4 py-2">0.0 ~ 0.5</td>
                        <td className="border px-4 py-2">Good</td>
                    </tr>
                    <tr style={{ backgroundColor: '#2ca02c' }}>
                        <td className="border px-4 py-2">0.5 ~ 1.0</td>
                        <td className="border px-4 py-2">Moderate</td>
                    </tr>
                    <tr style={{ backgroundColor: '#ff7f0e' }}>
                        <td className="border px-4 py-2">1.0 to 1.5</td>
                        <td className="border px-4 py-2">A little busy</td>
                    </tr>
                    <tr style={{ backgroundColor: '#d62728' }}>
                        <td className="border px-4 py-2">1.5 to 2.0</td>
                        <td className="border px-4 py-2">Hectic</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BusynessModal;
