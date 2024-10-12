import react from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import{Toaster} from 'react-hot-toast';

import Dashboard from './pages/dashboard.jsx';
//import Footer from './components/Footer.jsx';
import SideMenu from './components/Sidemenu.jsx';
import EditAccount from './components/EditAccount.jsx';
import DeleteAccount from './components/DeleteAccount.jsx';
import Contact from './pages/contact.jsx';
import About from './pages/about.jsx';
import RankPage from './pages/RankPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

const App = () => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);

    const toggleSideMenu = () => {
        setSideMenuVisible(!isSideMenuVisible);
    };

  return (
    
      <div>
      <Navbar toggleSideMenu={toggleSideMenu}/>
    
      <SideMenu isVisible={isSideMenuVisible} toggleSideMenu={toggleSideMenu}/>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="ranks" element={<RankPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
      </Routes>
      
      </div>
      
      
    
  );
};

export default App;