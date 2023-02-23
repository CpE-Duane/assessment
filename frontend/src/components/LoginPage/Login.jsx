import React from 'react'
import './login.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import Toast from '../../toast-msg/ToastMessage'
import { useNavigate } from "react-router-dom";
import ChatService from '../../service/chat-service';
import { Link } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const schema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  // login user
  const loginUser = async (payload) => {
    try {
      const response = await ChatService.loginUser(payload)
      Toast.successMsg(response.data.message)
      navigate("/chat-app")
    } catch (error) {
      Toast.errorMsg(error.response.data.message)
    }
  }


  return (
    <div className='login d-flex justify-content-center align-items-center'>
      <div className="card">
        <div className="card-header bg-success text-white py-3">
          <h2 className='fw-bold'>Welcome to Chat App</h2>
        </div>
        <div className="card-body mt-2 ">
          <form onSubmit={handleSubmit(loginUser)}>
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
                Login
              </button>
            </div>
            <div className='text-center mt-3'>
              <Link to="/register" className='btn btn-outline-success fw-bold'>
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login