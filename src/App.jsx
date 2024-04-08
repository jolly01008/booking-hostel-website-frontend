import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";


function App() {
  return (
    <div className="App">
        <h5> TEST </h5>
        <BrowserRouter>
          <Routes>
            <Route path="api/signin" element={<SignInPage />} />
            <Route path="api/signup" element={<SignUpPage />} />
            <Route path="api/hostels" element={<MainPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;