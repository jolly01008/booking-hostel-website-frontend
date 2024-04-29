import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import LandlordPage from "./pages/LandlordPage/LandlordPage.jsx";
import CreateHostel from "./pages/CreateHostel/CreateHostel.jsx";
import CreateRoom from "./pages/CreateRoom/CreateRoom.jsx";
import LandlordHostels from "./pages/LandlordHostels/LandlordHostels.jsx";
import LandlordHostel from "./pages/LandlordHostel/LandlordHostel.jsx";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="hostels" element={<MainPage />} />
              {/* <Route path="users/:id" element={<UserPage />} /> */}
              <Route path="users">
                  <Route index element={<UserPage />} />
                  <Route path=":id" element={<UserPage />} />
              </Route>
              <Route path="landlords">
                  <Route index element={<LandlordPage />} />
                  <Route path=":landlordId" element={<LandlordPage />} />
                  <Route path=":landlordId/hostels" element={<LandlordHostels />} />
                  <Route path=":landlordId/hostels/create" element={<CreateHostel />} />
                  <Route path=":landlordId/hostels/:hostelId/createRoom" element={<CreateRoom />} />
                  <Route path=":landlordId/hostels/:hostelId/rooms" element={<LandlordHostel />} />
              </Route>
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;