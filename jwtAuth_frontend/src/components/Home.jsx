import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Board from './Board';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['token']);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                console.log('No token found, redirecting to login');
                navigate('/login');
                return;
            }
            try {
                const { data } = await axios.post(
                    "http://localhost:5000",
                    {},
                    { withCredentials: true }
                );
                const { status, user } = data;
                if (status) {
                    setUserName(user);
                    toast(`Hello ${user}`, {
                        position: "top-right",
                    });
                } else {
                    removeCookie("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error('Verification failed, redirecting to login', error);
                removeCookie("token");
                navigate("/login");
            }
        };

        verifyCookie();

        return () => {
            console.log('Cleaning up');
        };
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        navigate("/signup");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 bg-gray-100 p-8">
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Dashboard Kanban</h2>
                    <p>This is where your main content will go. {userName}</p>
                    <Board />
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
