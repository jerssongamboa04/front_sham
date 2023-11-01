import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/AuthContext';
import { fetchData } from '../Utilities/Utilities';
import CreateIncident from '../Components/CreateIncident';
import equipo from '../Static/equipo.png';
import Header from '../Components/Header';


const Home = () => {

  const { logout, user } = useContext(UserContext);
  const [userApi, setUserApi] = useState();


  const handlelogout = async () => {
    sessionStorage.removeItem('emailUser');
    await logout()
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersResponse = await fetchData(`https://proyecto-sham-polar.vercel.app/users/${user.email}`);
        if (usersResponse && usersResponse.result) {
          const userData = usersResponse.result;
          setUserApi(userData[0])

        } else {
          console.error('Error fetching users:', usersResponse);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUser();
  }, [user]);




  return (
    <div className='min-h-screen '>
      {userApi && userApi.token ? <Header /> : "x"}
      <section className='mx-2 flex justify-between items-center pt-32 md:pt-20 '>
        <div className=" 2xl:p-2 2xl:text-2xl text-sm 2xl:my-8 md:mx-6 font-poppins gap-2 text-black border rounded p-1 shadow-[rgba(0,0,0,0.1)0_4px_12px] bg-blue-200 flex justify-center items-center">
          <h2>
            Bienvenido {userApi ? userApi.name : 'Usuario'} {/* Comprobación de user_api antes de acceder a sus propiedades */}
          </h2>
          <img className='lg:w-24 lg:h-24 2xl:w-28 2xl:h-28 border rounded-full w-16 h-16' src={equipo} alt={"icon"} />
        </div>
        <button onClick={handlelogout} className="2xl:px-4 2xl:text-2xl 2xl:rounded-md text-sm md:mx-6 text-white bg-red-600 border rounded p-2 " type="submit">Logout</button>

      </section>
      <CreateIncident />

    </div>
  )
}

export default Home;