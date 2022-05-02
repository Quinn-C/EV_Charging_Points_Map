import MapPage from './pages/MapPage/MapPage.js';
import { SignInPage } from './pages/SignInPage/SignInPage.js';
import { Routes, Route} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';


function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Routes>
        
        <Route
          path="/"
          element={!isAuthenticated ? <SignInPage /> : <MapPage />}
        />
        <Route path="/" element={<MapPage/>} />
        <Route path="/fleet" element={<MapPage />} />
        <Route path="/infrastructure" element={<MapPage />} />
        <Route path="/sales" element={<MapPage />} />
      </Routes>

      

        {/* <SignInPage /> */}
        {/* <Map /> */}
    </div>
  );
}

export default App;
