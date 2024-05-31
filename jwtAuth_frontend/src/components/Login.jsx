import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()
  const [inputValue,setInputValue] = useState({
    email:"",
    password:""
  })
  const {email,password} = inputValue
  
  const handleOnChange = (e)=>{
    const { name, value } = e.target;
    setInputValue({
        ...inputValue,
        [name]:value
      })
  }
  const handleError = (err)=>{
    toast.error(err,{
        position:"bottom-left"
    })
  }
  const handleSuccess = (msg)=>{
    toast.success(msg,{
        position:"bottom-right"
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic
    try {
        const {data} = await axios.post(
            "http://localhost:5000/login",
            {
            ...inputValue
            },
            {
                withCredentials:true
            }
        )
       
        const {message,success} = data
        if(success){
            handleSuccess(message)
            setTimeout(()=>{
                navigate('/')
            },1000)
        }else{
            console.log('errrrrr')
            handleError(message)
        }
    } catch (error) {
        console.error(error);
    }
    setInputValue({
        ...inputValue,
        email: "",
        password: "",
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              name='email'
              placeholder='Enter email'
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
