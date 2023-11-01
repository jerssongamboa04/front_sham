import React, { useEffect, useState, useContext } from 'react'
import { fetchData } from '../Utilities/Utilities';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';
import Header from '../Components/Header';

const Users = () => {

    const [users, setUsers] = useState();
    const { user } = useContext(UserContext);
    const [userApi, setUserApi] = useState();

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
    }, [user.email]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const usersResponse = await fetchData(`https://proyecto-sham-polar.vercel.app/users`);
                if (usersResponse && usersResponse.result) {
                    const userData = usersResponse.result;
                    setUsers(userData);
                } else {
                    console.error('Error fetching users:', usersResponse);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUser();
    }, []);




    return (

        <section className='2xl:my-8 min-h-screen flex flex-col pt-32 md:pt-24 '>
            {userApi && userApi.token ? <Header /> : "Cargando..."}

            <h2 className="my-6 font-bold text-5xl">Usuarios</h2>

            {users ? (<div className="flex flex-wrap items-center justify-center">
                {users && users.map((users, i) => {
                    return (

                        <div key={i} className={" text-center p-6 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-[#e4dfd8]"}>
                            <img
                                src={users.images}
                                className="w-32 rounded-full m-3"
                                alt="Avatar" />
                            <h5 className="mb-2 text-xl font-medium leading-tight">{users.name}</h5>
                            <p className="text-neutral-500 dark:text-neutral-400">{users.user_id}</p>
                            <button className="flex items-center gap-1 border rounded px-12 py-2 hover:bg-[#003B95] hover:scale-105 transition ease-in-out delay-250 bg-[#006CE6] text-white" >
                                <Link to={`user/${users.user_id}`}>Ver más</Link>
                            </button>
                        </div>
                    )
                })
                }
            </div>
            ) : (<div className='m-6'>
                <strong>Loading...</strong>
                <div
                    className="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"></div>
            </div>)}
        </section>
    )
}

export default Users;