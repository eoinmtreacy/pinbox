import './App.css';
import SideBarIcons from './components/SideBarIcon.js';
import Map from './components/Map.js';
import BottomNav from './components/BottomNav.js';
function App() {
    return (
        <div className="App">
            <SideBarIcons />
            <Map />
            <BottomNav />
        </div>
    );
}

export default App;
