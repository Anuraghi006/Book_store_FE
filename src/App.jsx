import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./User/Pages/Home";
import Contact from "./User/Pages/Contact";
import Book from "./User/Pages/Book";
import Profile from "./User/Pages/Profile";
import View from "./User/Pages/View";

import AdminDashboard from "./Admin/Pages/AdminDashboard";
import AdminResource from "./Admin/Pages/AdminResource";
import AdminSettings from "./Admin/Pages/AdminSettings";

import Auth from './Pages/Auth'
import PageNotFound from './Pages/PageNotFound'

import Preloader from './Components/Preloader'
import PaymentSuccess from './User/Pages/PaymentSuccess';
import PaymentFail from './User/Pages/PaymentFail';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/books' element={<Book/>} />
        <Route path='/login' element={<Auth/>} />
        {/* props passing */}
        <Route path='/register' element={<Auth insideRegister/>} />

        
          {/* role==user*/}
         
            <Route path='/profile/:id' element={<Profile/>} />
            <Route path='/books/:id' element={<View/>} />
            <Route path='/success' element={<PaymentSuccess/>} />
            <Route path='/cancel' element={<PaymentFail/>} />
        

        
          {/* role==admin */}
            <Route path='/admin' element={<AdminDashboard/>} />
            <Route path='/admin/resources' element={<AdminResource/>} />
            <Route path='/admin/settings' element={<AdminSettings/>} />
        
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App
