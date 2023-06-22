
import  { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link} from 'react-router-dom'
import { BiLogOut } from "react-icons/bi";
import './Navbar.module.css'
function Navbar() {
  const token= localStorage.getItem('FormacionBb2Token');
  const currentUser= localStorage.getItem('FormacionBb2User').split(" ");
  const navigate = useNavigate();
  let { page } = useParams();



  const logOut = () =>{
    localStorage.setItem("FormacionBb2Token","")
    localStorage.setItem("FormacionBb2User","")
    navigate('/');
  }
  useEffect(()=>{

  },[page])

  

  
  return (
    <nav>
        <ul>   
            {currentUser.includes("Administrador") && 
              <li><Link to='/adminPanel'> Panel de Administrador </Link></li>
            
            }       
            <li><Link to='/'> Items </Link></li>         
            {(token==="")?
               <li><Link to='/login'> Login </Link></li>
               :
               <li> <Link  to='/' onClick={logOut} > <BiLogOut/>Logout</Link></li>
            }
         

        </ul>
    </nav>
  )
}

export default Navbar
