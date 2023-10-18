import React, { useContext, useState } from 'react';
import Button from '../Components/Button'
import { UserContext } from '../Context/AuthContext';
import Alert from '../Components/Alert';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const { user, signup } = useContext(UserContext);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [userRegister,setUserRegister] = useState('');


    const handleChange = ({ target: { name, value } }) => {
        setUserRegister({ ...userRegister, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await signup(userRegister.email, userRegister.password);

            const response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userRegister.name,
                    user_email: userRegister.email,
                    images: `https://api.dicebear.com/6.x/micah/svg?seed=${userRegister.name}`,
                    token: ""
                }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                throw new Error('Error al registrarse');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center flex-col ">
            {error && <Alert message={error} />}
            <form onSubmit={handleSubmit} className="bg-white flex flex-col border rounded-2xl px-10 py-2 shadow-[rgba(0,0,0,0.1)0_4px_12px] lg:px-20">

                <h1 className="font-bold text-4xl m-0 p-1">REGISTER</h1>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2">
                    <input required placeholder='Name'
                        className="border rounded p-1"
                        type="text"
                        name="name"
                        onChange={handleChange}

                    />
                </div>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2">
                    <input required placeholder='Email'
                        className="border rounded p-1"
                        type="email"
                        name="email"
                        onChange={handleChange}

                    />
                </div>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2">
                    <input required placeholder='Password'
                        className="border rounded p-1"
                        type="password"
                        name="password"
                        onChange={handleChange}

                    />
                </div>
                <div className="flex justify-center flex-col">
                    <button className="m-4 text-white mb-2 bg-black border rounded px-12 py-2 hover:bg-[#00246E]" type="submit">Register</button>
                    <hr className="border-gray-300 my-4 w-full" />

                </div>
            </form>
            <Button url={user ? '/' : '/login'} content={!user ? 'Ya tienes cuenta? Inicia sesion' : 'No tienes cuenta? Registrate'} className={'text-white bg-[#1f1815] m-6 p-4 px-10 border rounded hover:opacity-80'} />

        </div>)
}

export default Register;
