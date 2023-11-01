import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/AuthContext';
import logo from '../Static/logo.png';
import { FaBars } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { Outlet } from 'react-router-dom';

const Header = () => {

    const [clicked, setClicked] = useState(false);
    const { user } = useContext(UserContext);

    const toggleDropdown = () => {
        setClicked(!clicked);
    };

    let Links = [
        { name: "Inicio", link: "/" },
        { name: "Ordenes de trabajo", link: "/ordenes" },
        { name: "Incidencias", link: "/incidents" },
        { name: "Usuarios", link: "/users" },
    ];

    return (

        <header className='2xl:h-20 w-screen h-16 bg-[#00246E] flex items-center justify-between px-6 fixed top-0'>

            <div className="absolute left-1/3 top-4 ml-4 md:left-1/3 md:ml-52 2xl:ml-48 lg:ml-40 xl:ml-40">
                <img className='2xl:w-32 2xl:h-32 w-24 h-24 lg:w-28 lg:h-28' src={logo} alt={'LogoPan'} />
            </div>

            {user && (
                <div className="ml-auto xl:hidden">
                    {clicked ? (
                        <AiFillCloseCircle
                            className="h-8 w-8 cursor-pointer text-28 text-white"
                            onClick={toggleDropdown}
                        />) : (
                        <FaBars className="h-8 w-8  cursor-pointer text-22 text-white" onClick={toggleDropdown} />
                    )}

                </div>
            )}

            {user && (
                <ul className={`lg:pt-10 xl:pt-0 ml-auto xl:flex xl:items-center xl:pb-0 pb-12 absolute xl:static bg-[#00246E] xl:z-auto z-[-1] 
            left-0 w-full xl:w-auto xl:pl-0 pl-0 transition-all duration-500 ease-in ${clicked ? 'top-20 opacity-100' : 'top-[-490px]'}`} >
                    {Links.map((link) => (
                        <li key={link.name} className="lg:mt-4 xl:text-xl md:ml-8 lg:text-lg text-xl md:my-0 my-7 mx-4">
                            <a href={link.link} className="text-white hover:text-yellow-400 duration-500">{link.name}</a>
                        </li>
                    )
                    )}
                </ul>
            )}
            <Outlet />
        </header>


    )
}

export default Header;