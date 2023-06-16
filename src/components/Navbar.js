
import  { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link} from 'react-router-dom'
import { BiLogOut } from "react-icons/bi";
function Navbar() {
  const token= localStorage.getItem('FormacionBb2Token');
  const navigate = useNavigate();
  let { page } = useParams();
  const logOut = () =>{
    localStorage.setItem("FormacionBb2Token","")
    navigate('/');
  }
  useEffect(()=>{

  },[page])

  

  
  return (
    <nav>
        <ul>
          
            <li><Link to='/'> Items </Link></li>
           

            {(token=="")?
               <li><Link to='/login'> Login </Link></li>
               :
               <li> <a href='#' onClick={logOut} > <BiLogOut/>Logout</a></li>
            }
        </ul>
    </nav>
  )
}

export default Navbar
