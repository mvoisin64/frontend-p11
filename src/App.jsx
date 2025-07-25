import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Home from './Pages/Home/Home.jsx';
import SignIn from './Pages/Sign-In/Sign-in.jsx';
import User from './Pages/User/User.jsx';
import NotFound from './Pages/NotFound/NotFound.jsx'
import './Styles/main.css';
import PrivateRoute from "./Components/PrivateRoute/PrivaterRoute.jsx";
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { setToken } from './redux/userslice';



function App() {
const dispatch = useDispatch();
const[loaded,setLoaded] = useState(false)
useEffect(() => {
    const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log(savedToken)
    if (savedToken) {
      dispatch(setToken(savedToken));
    }
    setBanane(true)
  }, []);

if(loaded){
return (
    <Router>
      <div className="app-layout">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
 
}

export default App;