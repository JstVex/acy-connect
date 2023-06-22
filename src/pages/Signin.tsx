import { useCallback, useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type Variant = "login" | "register";

const Signin = () => {
    const [variant, setVariant] = useState<Variant>("register");
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

    const handleSubmit = async (e: any) => {
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
        <div className='flex items-center justify-center w-screen h-screen'>
            <div className='bg-amber-100 px-10 py-8 shadow rounded-lg w-[25rem]'>
                <h3 className='text-3xl text-center mb-8'>
                    {variant === 'register' ? 'Register' : 'Login'}
                </h3>
                <form className='flex flex-col gap-y-3' onSubmit={handleSubmit}>
                    {variant === 'register' && (
                        <div>
                            <label htmlFor="name" className='sr-only'>
                                Name
                            </label>
                            <input
                                type="text"
                                id='name'
                                placeholder='Enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='border border-zinc-600 rounded-lg w-full py-2 px-3 placeholder:text-zinc-600 focus:outline-none'
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className='sr-only'>
                            Email
                        </label>
                        <input
                            type="text"
                            id='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border border-zinc-900/50 rounded-lg w-full py-2 px-3 placeholder:text-zinc-600 focus:outline-none focus:border-amber-800'
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='sr-only'>
                            Password
                        </label>
                        <input
                            type="text"
                            id='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border border-zinc-900 rounded-lg w-full py-2 px-3 placeholder:text-zinc-600 focus:outline-none'
                        />
                    </div>
                    <button type="submit" className='bg-amber-400 rounded-md px-3 py-2 w-28 mt-4 mx-auto'>
                        Submit
                    </button>
                </form>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-zinc-700">
                    <div>
                        {variant === 'login' ? 'New to acy connect?' : 'Already have an account?'}
                    </div>
                    <div className="underline cursor-pointer" onClick={toggleVariant}>
                        {variant === 'login' ? 'Create an account' : 'Login'}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signin