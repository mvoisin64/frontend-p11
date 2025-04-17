import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Home from './Pages/Home/Home.jsx';
import SignIn from './Pages/Sign-In/Sign-in.jsx';
import User from './Pages/User/User.jsx';
import './Styles/main.css';

function App() {
  return (
    <Router>
        <div className="app-layout">
      <Header />
      <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
}

export default App;