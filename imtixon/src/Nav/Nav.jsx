import {useEffect} from 'react'
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom';
import './nav.scss'
const RESTRICTED_ROUTES_FOR_NAV = ["/singup and login", "/singup and login/SingUp", "/singup and login/Login"]
 
const Nav = () => {

  const naviget = useNavigate()

  useEffect(() => {
     naviget("")
  }, [])

  const {pathname} = useLocation();
  const token = localStorage.getItem("token")

return RESTRICTED_ROUTES_FOR_NAV.find(route => route.includes(pathname)) ? null : (
    <>
      <nav className='nav_container nav_wrapp'>
        <h2>Ismoil</h2>
        <ul className='nav_list'>
         <li>
            <NavLink className={"nav_link"} to="">
                <h2>Home</h2>
            </NavLink>
          </li>
          { ! token ? 
            <ul className='up_style'>
              <NavLink className={"nav_link"} to="LogIn">
                 <h2>Log In</h2>
                </NavLink>
               <NavLink className={"nav_link"} to="SingUp">
                 <h2>Sing Up</h2>
              </NavLink>
            </ul>
          :
           <li>
              <NavLink className={"nav_link"} to="Admin">
                <h2>Admin</h2>
              </NavLink>
           </li>  
          }
        </ul>
      </nav>
      <Outlet/>
    </>
  )
}

export default Nav