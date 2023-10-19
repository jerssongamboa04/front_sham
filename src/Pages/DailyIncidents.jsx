import React, { useState, useContext, useEffect } from 'react';
import Alert from '../Components/Alert';
import { fetchData } from '../Utilities/Utilities';

import CheckMessage from '../Components/CheckMessage';
import { UserContext } from '../Context/AuthContext';
import DailyIncidenceId from '../Components/DailyIncidenceId';


const DailyIncidents = () => {
    const { user } = useContext(UserContext);

    const [user_api, setUser_api] = useState();
    const [error, setError] = useState();
    const [check, setCheck] = useState();
    const [incidenceDaily, setIncidenceDaily] = useState();


    const handleChange = ({ target: { name, value } }) => {
        setIncidenceDaily({ ...incidenceDaily, [name]: value });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const usersResponse = await fetchData(`https://proyecto-sham-polar.vercel.app/users/${user.email}`);
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


    const handleDailyIncidence = async (event) => {
        event.preventDefault();
        setError('');
        setCheck('');
        try {
            const response = await fetch('https://proyecto-sham-polar.vercel.app/incidenceDaily', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        user_id: user_api.user_id,
                        failure_daily: incidenceDaily.falla,
                        location_daily: incidenceDaily.localizacion,
                        description_daily: incidenceDaily.description,
                        downtime: incidenceDaily.parada,
                        name: user_api.name,
                        user_email: user.email,
                        time_start: new Date().toISOString()
                    }),
            });

            if (response.ok) {
                setCheck('Su incidencia fue creada');
                event.target.reset();
                setTimeout(() => setCheck(''), 3000); // Limpiar mensaje después de 3 segundos
                window.location.reload();


            } else {
                setError('Error al registrarse');
                setTimeout(() => setError(''), 3000); // Limpiar mensaje después de 3 segundos

            }
        } catch (error) {
            console.error('Error creating the incidence:', error);
        }
    };


    return (
        <section className='2xl:my-8 min-h-screen flex flex-col pt-32 md:pt-24 '>
            {/* <h1 className=" text-4xl md:my-6 font-bold md:text-5xl">Incidencias Diarias</h1> */}
            <div className=" flex justify-center items-center flex-col ">
                {error && <Alert message={error} />}
                {check && <CheckMessage message={check} />}
                <form onSubmit={handleDailyIncidence} className="p-8 md:pb-12 my-8 md:w-3/6 bg-white flex flex-col border rounded-2xl md:px-20 shadow-[rgba(0,0,0,0.1)0_4px_12px] md:gap-2">
                    <h1 className=" md:m-2 font-bold md:text-4xl md:p-4 ">Crea tus Incidencias Diarias</h1>

                    <div className="flex flex-col my-4 text-start">
                        <input required placeholder='Localizacion'
                            className="border rounded p-2"
                            type="text"
                            name="localizacion"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col my-4 text-start focus:outline-none focus:shadow-outline">
                        <input required placeholder='Tipo de falla'
                            className="border rounded p-2"
                            type="text"
                            name="falla"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col my-4 text-start focus:outline-none focus:shadow-outline">
                        <input required placeholder='Descripcion'
                            className="border rounded p-2"
                            type="text"
                            name="description"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col my-4 text-start focus:outline-none focus:shadow-outline">
                        <input required placeholder='Tiempo de parada'
                            className="border rounded p-2"
                            type="text"
                            name="parada"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <button className="m-4 text-white mb-2 bg-black border rounded px-12 py-2 hover:bg-[#003B95]" type="submit">Crear</button>
                    </div>
                </form>
            </div>

            <DailyIncidenceId />
        </section>
    )
}

export default DailyIncidents;