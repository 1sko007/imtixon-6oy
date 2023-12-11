import React, { useEffect, useLayoutEffect, useState } from 'react'
import { istance } from '../API'
import { toast } from 'react-toastify';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

import userpng from '../../img/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.avif'

import '../App.scss'

const Admin = () => {


    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true)
  
    useLayoutEffect(() => {
      istance("/api/users/", {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(response => {
          setLoading(false)
          setProfile(response.data)
        })
        .catch(error =>{
          setLoading(false)
          toast.error(error.response.data.errors[0].msg)
          navigate("/LogIn")
        })
    }, [])
  
    const handleLogOut = () => {
      const isUserAgreed = confirm("Are you really going to log out?")
      if(isUserAgreed){
        localStorage.removeItem("token")
        navigate("/LogIn")
      }
    }

  return (
    <div className='glavniy_container'>
      {
        profile ? 
        <>
          <div className='flex'>
          <div className='container_user'>
            <h2 className='user_h2'>Dashboard</h2>
            <ul className='user_list'>
                <li className='user_iytem'>
                    <img src={userpng} alt="" />
                    <h2> {profile.lastname}</h2>
                </li>
                <li className='user_iytem'>
                    <NavLink to="/Admin/createpost"  className={({isActive}) => isActive ? "user__link user__link_active1" : "user__link"}>
                        Create Post
                    </NavLink>
                </li>
                <li className='user_iytem'>
                     <NavLink to="/Admin/postd" className={({isActive}) => isActive ? "user__link user__link_active1" : "user__link"}>
                        Manage Posts
                    </NavLink>
                </li>
                <button onClick={handleLogOut}>Log out</button>
            </ul>
        </div>
        <Outlet/>
          </div>
        </>

        :
        <>
         {
            loading ? <p className='loading'>Loading...</p> : null
          }
        </>
        }
    </div>
  )
}

export default Admin