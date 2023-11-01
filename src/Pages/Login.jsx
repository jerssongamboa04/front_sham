import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/AuthContext';
import Alert from '../Components/Alert';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const { user, setUser, login } = useContext(UserContext);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await login(user.email, user.password);
            sessionStorage.setItem('emailUser', user.email); // Guardar en sessionStorage
            navigate('/');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center flex-col  ">
            {error && <Alert message={error} />}
            <form onSubmit={handleSubmit} className="bg-white flex flex-col border rounded-2xl px-10 py-10 shadow-[rgba(0,0,0,0.1)0_4px_12px] lg:px-20 lg:py-8 ">

                <h1 className="font-bold text-4xl p-1 m-0">LOGIN</h1>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2">
                    <input required placeholder='Email'
                        className="border rounded p-1"
                        type="email"
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2 focus:outline-none focus:shadow-outline">
                    <input required placeholder='Password'
                        className="border rounded p-1"
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-center items-center flex-col">
                    <button className="m-4 text-white mb-2 bg-black border rounded px-12 py-2 hover:bg-[#00246E]" type="submit">Login</button>
                    <hr className="border-gray-300 my-4 w-full" />
                </div>
            </form>
            <Button url={user ? '/' : '/register'} content={user ? 'Ya tienes cuenta? Inicia sesion' : 'No tienes cuenta? Registrate'} className={'text-white bg-[#1f1815] m-6 p-4 px-10 border rounded hover:opacity-80'} />

        </div>)
}

export default Login;