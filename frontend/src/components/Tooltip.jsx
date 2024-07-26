const Tooltip = ({ tooltipMsg }) => {
    return (
        <div>
            {' '}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded">
                {tooltipMsg}
            </div>
        </div>
    );
};
export default Tooltip;
