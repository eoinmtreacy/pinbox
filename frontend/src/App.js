import './App.css';
import SideBar from './components/Sidebar.js';
import Map from './components/Map.js';
import BottomNav from './components/BottomNav.js';
function App() {
    return (
        <div className="App">
            <div className=" w-[42vh] h-[100vh]">
                {' '}
                <Map />
                <BottomNav />
            </div>
        </div>
    );
}

export default App;
