import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../Utilities/Utilities';
import { Link } from "react-router-dom";

const UserId = () => {
    const { id } = useParams();
    const [userId, setUserId] = useState('');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await fetchData(`https://proyecto-sham-polar.vercel.app/incidenceDaily/user/${id}`);
                const users = usersData.result;

                setUserId(users);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, [id]);

    function capitalizeFirstLetter(str) {
        if (typeof str === 'string') {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return str;
        }
    }


    // ------- Formateo de Fecha ------
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `Fecha ${day}/${month}/${year} Hora: ${hours}:${minutes}`;
    };


    return (
        <section className='2xl:my-8 min-h-screen flex flex-col pt-32 md:pt-24 '>
            {userId.length === 0 ? (
                <div className='p-4'>No Tienes Incidencias, <Link to='/incidents'><button className='text-blue-900 font-bold p-1 hover:text-black hover:bg-blue-500 hover:rounded-lg 
            '>Comienza Ya!</button></Link></div>

            ) : <div>
                <h2 className=" text-4xl md:my-6 font-bold md:text-5xl">incidencias Diarias</h2>
                <h2 className='text-xl font-semibold text text-[#00246E] '>{capitalizeFirstLetter(userId[0].name)}</h2>
                {userId ? (
                    <div className="flex flex-wrap items-center justify-center">
                        {userId.map((daily, i) => {
                            const formattedStartDate = formatDate(daily.time_start);

                            return (
                                <div key={i} className="flex-grow md:flex-grow-0 md:w-96 md:h-auto flex flex-col gap-4 text-center p-6 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-slate-100">
                                    <div className='flex gap-5 items-center justify-between'>
                                        <h2 className="font-bold text-xl">#{capitalizeFirstLetter(daily.daily_id)}</h2>
                                        <h2 className={`font-bold text-lg px-2 py-1 rounded`}>
                                            {capitalizeFirstLetter(daily.failure_daily)}
                                        </h2>
                                    </div>
                                    <hr className="border-gray-300 w-full" />

                                    <div className='pr-8 flex justify-start gap-2 '>
                                        {/* <img src={adress} alt='icons' className='w-6 h-6'></img> */}
                                        <h2 className=" ">{capitalizeFirstLetter(daily.location_daily)} </h2>
                                    </div>

                                    <div className='pr-8 flex justify_start gap-2 items-center'>
                                        {/* <img src={configuraciones} alt='icons' className='w-6 h-6'></img> */}
                                        <h2 className="">{daily.description_daily}</h2>
                                    </div>

                                    <div className='pr-8 flex gap-2 justify_start items-center'>
                                        {/* <img src={mesa} alt='icons' className='w-6 h-6 mb-4'></img> */}
                                        <div className='flex flex-col justify-start'>
                                            <h2 className='text-left'>Tiempo de parada: {daily.downtime}</h2>
                                            <h2 className=" text-left font-semibold">{formattedStartDate}</h2>
                                        </div>
                                    </div>

                                    {/* 
                            <button onClick={() => deleteReservation(reservation.reservation_id)} className="m-2 border rounded px-12 py-2 hover:bg-[#003B95] hover:scale-105 transition ease-in-out delay-250 bg-[#006CE6] text-white" >
                                DELETE
                            </button> */}

                                </div>
                            );
                        })}
                    </div>) : (<div className='m-6'>
                        <strong>Loading...</strong>
                        <div
                            className="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"></div>
                    </div>)}

            </div>
            }
        </section>
    )
}

export default UserId;