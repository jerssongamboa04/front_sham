import React, { useState, useContext, useEffect } from 'react';
import Alert from '../Components/Alert';
import { fetchData } from '../Utilities/Utilities';
import CheckMessage from '../Components/CheckMessage';
import { UserContext } from '../Context/AuthContext';


const CreateIncident = () => {
    const { user } = useContext(UserContext);

    const [incidence, setIncidence] = useState();
    const [error, setError] = useState();
    const [check, setCheck] = useState();
    const [user_api, setUser_api] = useState();
    const [selectedPriority, setSelectedPriority] = useState('');


    const handleChange = ({ target: { name, value } }) => {
        if (name === 'priority') {
            setSelectedPriority(value);
        } else {
            setIncidence({ ...incidence, [name]: value });
        }
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


    const handleIncidence = async (event) => {
        event.preventDefault();
        setError('');
        setCheck('');
        try {
            const response = await fetch('https://proyecto-sham-polar.vercel.app/incidence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        fault_location: incidence.localizacion,
                        failure: incidence.falla,
                        priority_level: incidence.priority,
                        time_start: new Date().toISOString(),
                        user_id: user_api.user_id,
                        name: user_api.name,
                        description: incidence.description,
                        user_email: user.email

                    }),
            });

            if (response.ok) {
                setCheck('Su Orden fue creada');
                event.target.reset();
                setTimeout(() => setCheck(''), 3000); // Limpiar mensaje después de 3 segundos


            } else {
                setError('Error al registrarse');
                setTimeout(() => setError(''), 3000); // Limpiar mensaje después de 3 segundos

            }
        } catch (error) {
            console.error('Error creating the orden:', error);
        }
    };


    return (
        <section className='md:mb-4'>
            <div className=" flex justify-center items-center flex-col ">
                {error && <Alert message={error} />}
                {check && <CheckMessage message={check} />}
                <form onSubmit={handleIncidence} className="p-8 md:pb-12 my-8 md:w-3/6 bg-white flex flex-col border rounded-2xl md:px-20 shadow-[rgba(0,0,0,0.1)0_4px_12px] md:gap-2">
                    <h1 className=" md:m-2 font-bold md:text-4xl md:p-4 ">Nueva Orden</h1>

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
                        <select required
                            id="priority"
                            name="priority"
                            value={selectedPriority}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option value="" disabled>Selecciona prioridad</option>
                            <option value="Baja">Baja</option>
                            <option value="Normal">Normal</option>
                            <option value="Urgente">Urgente</option>
                        </select>
                    </div>

                    <div className="flex justify-center items-center flex-col">
                        <button className="m-4 text-white mb-2 bg-black border rounded px-12 py-2 hover:bg-[#003B95]" type="submit">Crear</button>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default CreateIncident;