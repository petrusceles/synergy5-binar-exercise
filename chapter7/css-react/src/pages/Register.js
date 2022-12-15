import React, { useState, useRef } from 'react'
import axios from 'axios';
import { BACKEND, ROLES } from '../lib/const';
import {Link, useNavigate } from 'react-router-dom';
export default function Register() {
    const navigate = useNavigate();

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [notification,setNotification] = useState('');

    const notificationRef = useRef(null);
    
    const onChangeNameHandler = (event) => {
        setName(event.target.value);
    }

    const onChangeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onChangePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onClickRegisterHandler = async (event) => {
        event.preventDefault();
        try {
            const requestBody = {
                name,email,password,role_id:ROLES.MEMBER
            }
            await axios.post(`${BACKEND.URL}/api/auth/register`,requestBody)
            navigate('/login')
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
            navigate('/register')
        }

    }

    return (
    <>
    <div className='flex h-screen flex-col lg:flex-row'>
        <div className='lg:w-1/2 w-full flex items-center justify-center px-40 py-16 lg:p-72 lg:bg-green-300'>
                <h1 className='lg:text-8xl xl:text-9xl text-slate-800 lg:font-medium text-7xl font-medium mx-auto text-center lg:text-left'>Binar Car Rental</h1>
        </div>
        <div className='lg:w-1/2 w-full flex flex-col items-center justify-center'>
            <form className='grid grid-cols-1 gap-4 p-6 lg:w-7/12  w-1/2 shadow bg-slate-50'>
                <input placeholder='Name' className='py-2 px-3 text-lg bg-slate-100 rounded-md' type={'text'} onChange={(event) => onChangeNameHandler(event)}/>
                <input placeholder='Email address' className='py-2 px-3 text-lg bg-slate-100 rounded-md' type={'email'} onChange={(event) => onChangeEmailHandler(event)}/>
                <input placeholder='Password' className='py-2 px-3 text-lg bg-slate-100 rounded-md' type={'password'} onChange={(event) => onChangePasswordHandler(event)}/>
                <p className='justify-self-center text-red-500' ref={notificationRef}>{notification}</p>
                <button className='bg-green-300 text-slate-800 py-2 px-3 text-xl font-semibold rounded-md focus:bg-green-200 ease-in-out duration-100' onClick={(event) => onClickRegisterHandler(event)}>Sign Up</button>
            </form>
            <p className='p-6'>Already have an account? <Link to={"/login"} className="font-bold text-green-700">Login</Link></p>
        </div>
    </div>
    </>
    )
}
