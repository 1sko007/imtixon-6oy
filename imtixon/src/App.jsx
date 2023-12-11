import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react"

import Home from './page/Home'
import Nav from './Nav/Nav'
import LogIn from './singup and login/LogIn'
import SingUp from './singup and login/SingUp'
import Admin from './admin/Admin';
import Product from './page/Product';
import CreatePost from "./page/CreatePost";
import PostD from "./page/PostD";


import './App.scss'

function App() {

  const modalref = useRef();

  return (
    <>
     <Nav/>
     <Routes>
       <Route path='' element={<Home/>}/>
       <Route path='product-view/:id' element={<Product/>}/>
        <Route path='LogIn' element={<LogIn/>}/>
        <Route path='SingUp' element={<SingUp/>}/>
        {/* <Route path='Admin' element={<Admin/>}/> */}
        <Route path='Admin' element={<Admin/>}>
          <Route path='createpost' element={<CreatePost/>}/>
          <Route path='postd' element={<PostD/>}/>
        </Route>
     </Routes>
     <ToastContainer/>
    </>
  )
}

export default App
