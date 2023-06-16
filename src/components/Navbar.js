
import React from 'react'
import { Link} from 'react-router-dom'
function Navbar() {
  const logOut = () =>{
    localStorage.setItem("FormacionBb2Token","")
  
  }
  return (
    <nav>
        <ul>
           <li> <a href='#' onClick={logOut} >LogOut</a></li>
            <li><Link to='/'> Items </Link></li>
            <li><Link to='/login'> Login </Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
