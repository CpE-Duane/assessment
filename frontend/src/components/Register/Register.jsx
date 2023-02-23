import React from 'react'
import { useState } from 'react'
import './register.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import Toast from '../../toast-msg/ToastMessage'
import { useNavigate } from "react-router-dom";
import ChatService from '../../service/chat-service';
import { Link } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const schema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const registerUser = async (payload) => {
        try {
            const response = await ChatService.registerUser(payload)
            Toast.successMsg(response.data.message)
            navigate("/login")

        } catch (error) {
            Toast.errorMsg(error.response.data.message)
        }       
    }


    return (
        <div className='register d-flex justify-content-center align-items-center'>
            <div className="card">
                <div className="card-header bg-success text-white py-3">
                    <h2 className='fw-bold'>Create your account</h2>
                </div>
                <div className="card-body mt-2 ">
                    <form onSubmit={ handleSubmit(registerUser)}>
                        <div className='mb-3'>
                            <span className='fw-bold'>Email</span>
                            <input type="email"
                                placeholder='Email'
                                {...register('email')}
                                className={`form-control ${errors.email && 'is-invalid'}`}
                            />
                            <span className="invalid-feedback">{errors.email?.message}</span>
                        </div>
                        <div>
                            <span className='fw-bold'>Password</span>
                            <input type="password"
                                placeholder='Password'
                                className={`form-control ${errors.password && 'is-invalid'}`}
                                {...register('password')}
                            />
                            <span className="invalid-feedback">{errors.password?.message}</span>
                        </div>
                        <div className='d-grid mt-3'>
                            <button className='btn btn-success'>
                                Register
                            </button>
                        </div>
                        <div className='text-center mt-3'>
                          <Link to="/login" className='btn btn-outline-success fw-bold px-5'>
                            Login
                          </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register