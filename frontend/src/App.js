import './App.css';
import SideBar from './components/Sidebar.js';
import Map from './components/Map.js';
import BottomNav from './components/BottomNav.js';
import Login from './components/Login';
import Signup from './components/Signup.js';
import Main from './components/Main.js';
import PasswordFind from './components/PasswordFind.js';
function App() {
    return (
        <div className="App">
            {/* <div className=" w-[42vh] h-[100vh]">
                {' '}
                <Map />
                <BottomNav />
            </div> */}
            {/* <Login /> */}
            {/* <Signup /> */}
            {/* <Main /> */}
            <PasswordFind />
        </div>
    );
}

export default App;
