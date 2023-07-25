import { useCallback, useState, useContext, FormEvent } from "react";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type Variant = "login" | "register";

const Signin = () => {
    const [variant, setVariant] = useState<Variant>("login");
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleVariant = useCallback(() => {
        if (variant === "login") {
            setVariant("register");
        } else {
            setVariant("login");
        }
    }, [variant]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (variant === 'register') {
            const requestBody = {
                name: name,
                email: email,
                password: password
            };

            try {
                const response = await fetch('http://localhost:4080/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.ok) {
                    const data = await response.json();
                    login(data);
                    navigate('/groups');
                    console.log(data);

                } else {
                    const errorData = await response.json();
                    console.log(errorData.error);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (variant === 'login') {
            const requestBody = {
                email: email,
                password: password
            };

            try {
                const response = await fetch('http://localhost:4080/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.ok) {
                    const data = await response.json();
                    login(data);
                    navigate('/groups');
                    console.log(data);
                } else {
                    const errorData = await response.json();
                    console.log(errorData.error);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='flex w-screen h-screen'>
            <img src="https://onedrive.live.com/embed?resid=3616EC68410FC656%21733&authkey=%21AJiJEKx1KNdcCZQ&width=1280&height=964" alt="" className="w-auto h-auto max-w-[60vw] max-h-[100vh] object-cover hidden md:block" />
            <div className='bg-amber-100 shadow rounded-lg w-screen md:w-[40vw]'>
                <div className="flex flex-col h-screen items-center justify-center">
                    <h3 className='text-2xl text-center mb-16 text-gray-900'>
                        Welcome to ACY Connect
                    </h3>
                    <form className='flex flex-col gap-y-3' onSubmit={handleSubmit}>
                        {variant === 'register' && (
                            <div>
                                <label htmlFor="name" className=''>
                                    User name
                                </label>
                                <input
                                    type="text"
                                    id='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='bg-amber-100 border-b border-zinc-900/50 mt-1 mb-2 w-full placeholder:text-zinc-600 focus:outline-none focus:border-amber-800'
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className=''>
                                Email
                            </label>
                            <input
                                type="text"
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='bg-amber-100 border-b border-zinc-900/50 mt-1 mb-2 w-full placeholder:text-zinc-600 focus:outline-none focus:border-amber-800'
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className='text-gray-700'>
                                Password
                            </label>
                            <input
                                type="text"
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='bg-amber-100 border-b border-zinc-900/50 mt-1 mb-2 w-full placeholder:text-zinc-600 focus:outline-none focus:border-amber-800'
                            />
                        </div>
                        <button type="submit" className='bg-amber-800 text-white rounded-3xl px-3 py-2 w-40 mt-4 mx-auto'>
                            {variant === 'register' ? 'Register' : 'Login'}
                        </button>
                    </form>
                    <div className="mt-16 flex gap-2 justify-center text-sm px-2 text-zinc-700">
                        <div>
                            {variant === 'login' ? 'New to acy connect?' : 'Already have an account?'}
                        </div>
                        <div className="underline cursor-pointer" onClick={toggleVariant}>
                            {variant === 'login' ? 'Create an account' : 'Login'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin