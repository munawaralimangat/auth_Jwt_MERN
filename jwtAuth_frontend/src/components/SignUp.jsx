import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate()
  const [inputValue,setInputValue] = useState({
    email:"",
    userName:"",
    password:""
  })

  const {email,password,userName} = inputValue;
  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setInputValue({
        ...inputValue,
        [name]:value
    })
  }
  const handleError = (msg)=>{
    toast.success(msg,{
        position:"bottom-left"
    })
  }
  const handleSuccess = (msg)=>{
    toast.success(msg,{
        position:'bottom-right'
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic
    try {
        const {data} = await axios.post(
            "http://localhost:5000/signup",
            {
                ...inputValue
            },
            {
                withCredentials:true
            }
        )
        const {success,message} = data
        if(success){
            handleSuccess(message)
            setTimeout(() => {
                navigate("/");
              }, 1000);
        }else{
            handleError(message);
        }
    } catch (error) {
        console.error(error)
    }
    setInputValue({
        ...inputValue,
        email:"",
        userName:"",
        password:""
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">User Name</label>
            <input
              type="text"
              value={userName}
              name='userName'
              placeholder='Enter user name'
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
              required
              autoComplete="userName"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
          <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
        </form>
      </div>
      <ToastContainer />
    </div>

  );
};

export default Signup;
