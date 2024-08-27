import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../common/index';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Api.signUp.url, { name, email, password });
            if (response.data.success) {
                navigate('/');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Something went wrong');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">Sign Up</button>
            </form>
            <p className="mt-4">
                Already have an account? <Link to="/" className="text-blue-500">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUp;