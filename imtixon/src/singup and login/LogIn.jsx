import { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import {toast} from "react-toastify";
import { istance } from '../API';
import { useNavigate, NavLink } from 'react-router-dom';

const LogIn = () => {

    
    const navigate = useNavigate();
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateUser = (e) => {
        e.preventDefault();

        setLoading(true);
        istance.post('/api/auth/login', {
          email: email,
          password: password
        })
          .then(response =>  {
            setLoading(false);
            if(response.status === 200){
              toast.success("You registered successfully");
              localStorage.setItem("token", response.data.token);
              navigate("/")
            }
            console.log(response);
          })
          .catch(error => {
            setLoading(false);
            toast.error(error.response.data.errors[0].msg);
          })
    
      }

  return (
    <>
    <div className='auth'>
      <div className='autlet_styel'>
         <h2 className='auth_h2'>Log In</h2>
           <form className='auth_form' onSubmit={handleCreateUser}>
               <input className='auth_input' type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
               <div className='password_wrapper'>
             <input className='auth_input' type={isVisiblePassword ? "text" : "password"} placeholder='password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
             {
              isVisiblePassword ? <FaRegEyeSlash  onClick={() => setIsVisiblePassword(false)} /> : <FaRegEye onClick={() => setIsVisiblePassword(true)}/>
             }
           </div>
               <p>Don’t you have an account? <NavLink to="SingUp">Sing Up</NavLink></p>
               <button type='submit' disabled={loading}>{loading ? "Log In..." : "Log In"}</button>
           </form>
      </div>
    </div>
    </>
  )
}

export default LogIn