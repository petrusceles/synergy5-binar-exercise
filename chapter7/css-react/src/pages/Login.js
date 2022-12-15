import React, { useRef, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
export default function Login() {
    let navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [notification,setNotification] = useState('');

    const notificationRef = useRef(null);

    const emailHandler = (event) => {
        const emailInput = event.target.value;
        setEmail(emailInput);
    }

    const passwordHandler = (event) => {
        const passwordInput = event.target.value;
        setPassword(passwordInput);
    }

    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            const requestBody = {
                email,password
            }
            const response = await axios.post('http://localhost:2000/api/auth/login',requestBody)
            // console.log(response.data.message);
            // console.log(notificationRef.current.classList.contains('hidden'))
            console.log(response)
            // if (response.status !== 200) {
            //     setNotification(response.data.message)
            //     notificationRef.current.classList.remove('hidden')
            //     navigate('/login')
            // } else {
            //     localStorage.setItem("token", response.data.data.token)
            //     navigate('/admin')
            // }
            localStorage.setItem("token", response.data.data.token)
            navigate('/admin')
        } catch (err) {
            const responseMessage = err.response.data.message
            let finalMessage = '';
            if (Array.isArray(responseMessage)) {
                responseMessage.forEach(e => {
                    finalMessage += ` ${e.message}`
                });
            } else {
                finalMessage = responseMessage
            }
            setNotification(finalMessage)
            notificationRef.current.classList.remove('hidden')
            navigate('/login')
        }
    }


  return (
    <>
    <div className='flex h-screen flex-col lg:flex-row'>
        <div className='lg:w-1/2 w-full flex items-center justify-center px-40 py-16 lg:p-72 lg:bg-green-300'>
                <h1 className='lg:text-8xl xl:text-9xl lg:font-medium text-7xl font-medium mx-auto text-center lg:text-left text-slate-800'>Binar Car Rental</h1>
        </div>
        <div className='lg:w-1/2 w-full flex flex-col items-center justify-center'>
            <form className='grid grid-cols-1 gap-4 p-6 lg:w-7/12  w-1/2 shadow bg-slate-50'>
                <input placeholder='Email address' className='py-2 px-3 text-lg bg-slate-100 rounded-md' type={'email'} onChange={(event) => emailHandler(event)}/>
                <input placeholder='Password' className='py-2 px-3 text-lg bg-slate-100 rounded-md' type={'password'} onChange={(event) => passwordHandler(event)}/>
                <p className='justify-self-center hidden text-red-500' ref={notificationRef}>{notification}</p>
                <button className='bg-green-300 text-slate-800 py-2 px-3 text-xl font-semibold rounded-md focus:bg-green-200 ease-in-out duration-100' onClick={(event) => loginHandler(event)}>Login</button>
            </form>
            <p className='p-6'>Dont have an account? <Link to={"/register"} className="font-bold text-green-700">Sign Up</Link></p>
        </div>
    </div>
    </>
  )
}
