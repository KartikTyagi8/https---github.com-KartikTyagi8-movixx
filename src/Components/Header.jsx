import React, {useState} from 'react'
import "../App.scss"
import { Link,useNavigate } from 'react-router-dom'
import Dropdown from './dropdown/Dropdown.jsx'
import {ImSearch} from 'react-icons/im'
import {IoIosArrowDropdown} from 'react-icons/io'
import logo from '../assets/movix-logo.png'
const  Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const textColor = isDropdownOpen ? 'grey' : 'black';

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const clickLogo = () => {
    navigate('/'); // Replace '/' with the path of your home page
  };

  return (
    <nav className='header'>
         <img src={logo} alt='logo' onClick={clickLogo}/>
         <div className='center-header'>
              <div className='options'>
                <Link to='/tv'> TV Shows </Link>
                <Link to='/movie'> Movies </Link>
                <div className='categories' onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}> Categories  <IoIosArrowDropdown />
                  
                  {isDropdownOpen && <Dropdown />}
                </div>
              </div>
              <input type="text" placeholder='Search for the movies and TV shows...' />
         </div>
         
        <ImSearch />
    </nav>
  )
}

export default  Header
