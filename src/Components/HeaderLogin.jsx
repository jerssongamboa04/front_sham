import React from 'react'
import logo from '../Static/logo.png';

const HeaderLogin = () => {
    return (
        <header className='2xl:h-20  w-screen h-16 bg-[#00246E] flex items-center justify-between px-6 fixed top-0'>
            <div className="absolute left-1/3 top-4 ml-4 md:left-1/3 md:ml-52 2xl:ml-48 lg:ml-40 xl:ml-40">
                <img className='2xl:w-32 2xl:h-32 w-24 h-24 lg:w-28 lg:h-28' src={logo} alt={'LogoPan'} />
            </div>
        </header>
    )
}

export default HeaderLogin