import React from 'react';
import { useEffect,useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [cookies,removeCookie] = useCookies([])
    const [userName,setUserName] = useState('')

    useEffect(()=>{
        const verifyCookie = async ()=>{
            if(!cookies.token){
              console.log('not verified')
                navigate('/login')
            }
            const {data} = await axios.post(
                "http://localhost:5000",
                {},
                {withCredentials: true}
            );
            const {status,user} = data;
            console.log(data)
            setUserName(user)
            return status
            ? toast(`Hello ${user}`, {
                position: "top-right",
              })
            : (removeCookie("token"), navigate("/login"));
        }
        verifyCookie()
        return ()=>{
          console.log('cleaniy')
        }
    },[cookies, navigate, removeCookie])
    const Logout = () => {
      removeCookie("token");
      navigate("/signup");
    };
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-100 p-8">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Dashboard Kanban</h2>
          <p>This is where your main content will go.{userName}</p>
        </div>
      </main>
      <button onClick={Logout}>LOGOUT</button>
      <ToastContainer/>
    </div>
  );
};

export default Home;
