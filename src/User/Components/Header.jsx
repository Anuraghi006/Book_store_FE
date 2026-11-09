import React, { useEffect, useState } from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { LuCircleUserRound } from "react-icons/lu";
import { 
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Button, 
  Navbar, 
  NavbarBrand, 
  NavbarCollapse, 
  NavbarLink, 
  NavbarToggle 
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const navigate = useNavigate();

 useEffect(() => {
    const token = sessionStorage.getItem('userToken');
    const storedUser = sessionStorage.getItem('userData'); 
    
    if (token) {
      setUserToken(token);
    }
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData({
          username: user.username || "",
          email: user.email || "",
          picture: user.picture || "" 
        });
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.clear();
    setUserToken(null);
    setUserData({ username: "", email: "" });
    navigate('/login'); 
  };

  return (
    <div>
      

      {/* Navigation Bar */}
      <Navbar className="bg-slate-50 text-slate-800 dark:bg-slate-50 border-b" fluid rounded>
        <NavbarBrand href="#" className="flex items-center">
          <img 
            src="https://i.pinimg.com/1200x/24/34/4a/24344a571a5beac4b380b3d52c026f3a.jpg" 
            className="mr-3 h-8 sm:h-10 object-contain" 
            alt="Book Store Logo" 
          />
        </NavbarBrand>

        <div className="flex-1 flex justify-center items-center ms-45">
          <span className="text-3xl font-bold tracking-wide text-gray-800 uppercase">
            A<span className="text-3xl font-bold tracking-wide text-gray-800 uppercase">rchival</span><span className='text-3xl text-sky-600'>Blue</span>
          </span>
        </div>  

        <NavbarToggle />
        <NavbarCollapse>
          <div className="flex items-center gap-4 py-2">
            {userToken ? (
              <>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar 
                      alt="User settings" 
                      img={userData.picture || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} 
                      rounded 
                    />
                  }
                >
                  <DropdownHeader>
                    <span className="block text-sm font-bold text-gray-900">{userData.username || "User"}</span>
                    <span className="block truncate text-sm font-medium text-gray-500">{userData.email}</span>
                  </DropdownHeader>
                  
                  <Link to="/profile/1">
                    <DropdownItem>Profile</DropdownItem>
                  </Link>
                  
                  <DropdownDivider />
                  
                  <DropdownItem onClick={handleLogout}>
                    Sign out
                  </DropdownItem>
                </Dropdown>
              </>
            ) : (
              <>
                <NavbarLink href="#" className="hover:text-sky-600 transition-colors">
                  <FaInstagram size={22} className="text-gray-700 hover:text-sky-600" />
                </NavbarLink>
                <NavbarLink href="#" className="hover:text-sky-600 transition-colors">
                  <FaXTwitter size={22} className="text-gray-700 hover:text-sky-600" />
                </NavbarLink>
                <NavbarLink href="#" className="hover:text-sky-600 transition-colors">
                  <CiFacebook size={24} className="text-gray-700 hover:text-sky-600" />
                </NavbarLink>
                <Link to="/login">
                  <Button color="gray" className="flex items-center gap-2 border-gray-300">
                    <LuCircleUserRound size={18} className="mr-1" /> Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </NavbarCollapse>
      </Navbar>

      {/* Secondary Menu Strip */}
      <div className="flex justify-center bg-black text-white shadow-inner">
        <ul className="flex justify-around items-center gap-12 py-3 font-medium tracking-wide uppercase text-sm">
          <li><Link to="/" className="cursor-pointer hover:text-sky-300 transition-colors">Home</Link></li>
          <li><Link to='/books' className="cursor-pointer hover:text-sky-300 transition-colors">Books</Link></li>
          <li><Link to='/contact' className="cursor-pointer hover:text-sky-300 transition-colors">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;