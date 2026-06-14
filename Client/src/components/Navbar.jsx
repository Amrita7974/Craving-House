import React from 'react'
import { Link, } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <div className='bg-(--secondary) text(--primary-text)p-3 h-10 flex justify-between'>
       <div> Cravings</div>
        
        <div className="flex gap-4">
            <Link to={"/"} className='hover:underline'>
            Home
            </Link>
            <Link to={"/Login"} className='hover:underline'>
            Login
            </Link>
             <Link to={"/Register"} className='hover:underline '>
            Register
            </Link>
             <Link to={"/Contactus"} className='hover:underline '>
            ContactUs
            </Link>
        </div>
        </div>
    </>
  );
};

export default Navbar;