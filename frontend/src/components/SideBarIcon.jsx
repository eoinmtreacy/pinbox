const SideBarIcons = () => {
    return (
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 p-2">
            <button className="block p-2 mb-2 bg-gray-200 rounded-full">
                <i className="fas fa-car"></i>
            </button>
            <button className="block p-2 mb-2 bg-gray-200 rounded-full">
                <i className="fas fa-bicycle"></i>
            </button>
        </div>
    );
};

export default SideBarIcons;
