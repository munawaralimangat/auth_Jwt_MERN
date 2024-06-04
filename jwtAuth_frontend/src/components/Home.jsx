import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Board from './Board';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found, redirecting to login');
                navigate('/login');
                return;
            }
            try {
                const { data } = await axios.post(
                    "http://localhost:5000",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const { status, user } = data;
                if (status) {
                    setUserName(user);
                    toast(`Hello ${user}`, {
                        position: "top-right",
                    });
                } else {
                    console.log('Token verification failed, redirecting to login');
                    localStorage.removeItem('token');
                    navigate("/login");
                }
            } catch (error) {
                console.error('Verification failed, redirecting to login', error);
                localStorage.removeItem('token');
                navigate("/login");
            }
        };

        verifyToken();
    }, [navigate]);

    const Logout = () => {
        localStorage.removeItem('token');
        navigate("/signup");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 bg-gray-100 p-8">
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Dashboard Kanban</h2>
                    <p>This is where your main content will go. {userName}</p>
                    <Board user={'user'}/>
                </div>
            </main>
            <button
                onClick={Logout}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                LOGOUT
            </button>
            <ToastContainer />
        </div>
    );
};

export default Home;
