import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";


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
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;