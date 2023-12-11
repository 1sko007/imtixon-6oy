import { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import {toast} from "react-toastify";
import { istance } from '../API';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './style.scss'

const SingUp = () => {

    
    const navigate = useNavigate();
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [FirstName, setFirstName] = useState("");
    const [lastname, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateUser = (e) => {
        e.preventDefault();

        setLoading(true);
        istance.post('/api/auth/signup', {
            firstname: FirstName,
            lastname: lastname,
            email: email,
            password: password
        })
          .then(response =>  {
            setLoading(false);
            if(response.status === 201){
              toast.success("You registered successfully");
              navigate("/LogIn")
            }
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
         <h2 className='auth_h2'>Creat an account</h2>
           <form className='auth_form' onSubmit={handleCreateUser}>
               <input className='auth_input' type="text" placeholder='FirstName' required value={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
               <input className='auth_input' type="text" placeholder='LastName' required value={lastname} onChange={(e) => setlastName(e.target.value)}/>
               <input className='auth_input' type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
               <div className='password_wrapper'>
             <input className='auth_input' type={isVisiblePassword ? "text" : "password"} placeholder='password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
             {
              isVisiblePassword ? <FaRegEyeSlash  onClick={() => setIsVisiblePassword(false)} /> : <FaRegEye onClick={() => setIsVisiblePassword(true)}/>
             }
           </div>
               <p>Don’t you have an account? <NavLink to="LogIn">Login</NavLink></p>
               <button type='submit' disabled={loading}>{loading ? "Creating..." : "Create an account"}</button>
           </form>
      </div>
    </div>
    </>
  )
}


export default SingUp