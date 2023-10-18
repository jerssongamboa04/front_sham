import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/AuthContext';
import { fetchData } from '../Utilities/Utilities';
import CreateIncident from '../Components/CreateIncident';
import equipo from '../Static/equipo.png';


const Home = () => {

  const { logout, user } = useContext(UserContext);
  const [user_api, setUser_api] = useState();


  const handlelogout = async () => {
    sessionStorage.removeItem('emailUser');
    await logout()
  }
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersResponse = await fetchData(`http://localhost:8000/users/${user.email}`);
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
  }, [user.email]);

  return (
    <div className='min-h-screen '>
      <section className='flex justify-between items-center pt-32 md:pt-20 '>
        <h2 className="md:mx-6 font-poppins gap-4 text-black border rounded p-2 shadow-[rgba(0,0,0,0.1)0_4px_12px] bg-blue-200 flex justify-center items-center">
          Bienvenido {user_api ? user_api.name : 'Usuario'} {/* Comprobación de user_api antes de acceder a sus propiedades */}
          <img className='border rounded-full w-16 h-16' src={equipo} alt={"icon"} />
        </h2>
        <button onClick={handlelogout} className=" md:mx-6 text-white bg-red-600 border rounded p-2 " type="submit">Logout</button>

      </section>
      <CreateIncident />

    </div>
  )
}

export default Home;