import React from 'react';

const BusynessModal = ({ isOpen, onRequestClose, busyness }) => {
    return (
        <div className="buynessta flex flex-col bg-white rounded-2xl border border-solid border-stone-400 max-w-xs p-5 bg-opacity-80">
            <h2 className="text-2xl font-bold text-center">Busyness</h2>
            <table className="table-auto w-full">
                <tbody>
                    <tr style={{ backgroundColor: '#1f77b4' }}>
                        <td className="border px-4 py-2 text-white">Quiet</td>
                    </tr>
                    <tr style={{ backgroundColor: '#ffbf00' }}>
                        <td className="border px-4 py-2">Moderate</td>
                    </tr>
                    <tr style={{ backgroundColor: '#ff7f0e' }}>
                        <td className="border px-4 py-2">A little busy</td>
                    </tr>
                    <tr style={{ backgroundColor: 'red' }}>
                        <td className="border px-4 py-2">Hectic</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BusynessModal;
