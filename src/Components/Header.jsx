import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/AuthContext';
import logo from '../Static/logo.png';
import { FaBars } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { fetchData } from '../Utilities/Utilities';

const Header = () => {

    const [clicked, setClicked] = useState(false);
    const { user } = useContext(UserContext);
    const [user_api, setUser_api] = useState();
    const userEmail = user?.email; // Usando verificación opcional

    const toggleDropdown = () => {
        setClicked(!clicked);
    };

    let Links = [
        { name: "Home", link: "/" },
        { name: "Ordenes de trabajo", link: "/ordenes" },
        { name: "Incidencias", link: "/incidents" },
        { name: "Usuarios", link: "/users" },
    ];


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const usersResponse = await fetchData(`http://localhost:8000/users/${userEmail}`);
                if (usersResponse && usersResponse.result) {
                    const userData = usersResponse.result;
                    setUser_api(userData[0]);
                } else {
                    console.error('Error fetching users:', usersResponse);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUser();
    }, [userEmail]);


    return (

        <header className='w-screen h-16 bg-[#00246E] flex items-center justify-between px-6 fixed top-0'>

            <div className="absolute left-1/3 top-4 ml-4 md:left-1/3 md:ml-52">
                <img className='w-24 h-24' src={logo} alt={'LogoPan'} />
            </div>

            {user && user_api?.token && (
                <div className="ml-auto md:hidden">
                    {clicked ? (
                        <AiFillCloseCircle
                            className="h-8 w-8 cursor-pointer text-28 text-white"
                            onClick={toggleDropdown}
                        />) : (
                        <FaBars className="h-8 w-8  cursor-pointer text-22 text-white" onClick={toggleDropdown} />
                    )}

                </div>
            )}

            {user && user_api?.token && (
                <ul className={` ml-auto md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#00246E] md:z-auto z-[-1] 
            left-0 w-full md:w-auto md:pl-0 pl-0 transition-all duration-500 ease-in ${clicked ? 'top-20 opacity-100' : 'top-[-490px]'}`} >
                    {Links.map((link) => (
                        <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7 mx-4">
                            <a href={link.link} className="text-white hover:text-yellow-400 duration-500">{link.name}</a>
                        </li>

                    )
                    )}
                </ul>
            )}

        </header>


    )
}

export default Header;