import React, { useEffect, useState, } from 'react'
import ImgHome from '../../img/image 2 (1).png'
import { istance, truncate } from '../API'
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, NavLink } from 'react-router-dom';
import '../App.scss'
import '../Nav/nav.scss'
const RESTRICTED_ROUTES_FOR_NAV = ["/singup and login", "/singup and login/SingUp", "/singup and login/Login"]


const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
        try{
          const response = await istance("/api/posts")
          setProducts(response.data.data)
        } catch (error) {

        }
    }
    fetchData()
  }, [])
  console.log(products);

  const {pathname} = useLocation();
  const token = localStorage.getItem("token")

  return  (
    <>
    
     <div className='nav_container nav_wrapp'>
      <h2>Ismoil</h2>
      <ul className='nav_list'>
        <li>
        <NavLink className={"nav_link"} to="">
            <h2>Home</h2>
          </NavLink>
        </li>
      { ! token ? 
           <li className='salom'>
           <NavLink className={"nav_link"} to="LogIn">
             <h2>Log In</h2>
           </NavLink>
           <NavLink className={"nav_link"} to="SingUp">
             <h2>Sing Up</h2>
           </NavLink>
          </li>
      :  
       <li>
        <NavLink className={"nav_link"} to="Admin">
          <h2>Admin</h2>
        </NavLink>
       </li>
      }
      </ul>
     </div>

     <div className='home_container'>
        <ul className='home_list'>
            <li className='home_iytem'>
                <img src={ImgHome} alt="" />
            </li>
        </ul>
     </div>
     <div className='products_container'>
        <h2>All articles</h2>
        <ul className='products_list'>
            {
                products.map(product => 
               <Link to={`product-view/${product._id}`} className={"product_page"} key={product._id}>
                  <li className='products_iytem'>
                    <img src={product.image} alt="" />
                    <h2>{truncate(product.title, 20)}</h2>
                    <p>{truncate(product.description, 180)}</p>
                 </li>    
               </Link>
                )
            }
        </ul>
     </div>
    </>
  )
}

export default Home
