import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import Toast from '../../toast-msg/ToastMessage'
import { useNavigate } from "react-router-dom";
import ChatService from '../../service/chat-service';
import { Link } from 'react-router-dom'

const AddContact = () => {

    const navigate = useNavigate()

    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        img: Yup.string(),
        fileName: Yup.string()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const addContact = async (payload) => {
        const contactPayload = {
            name: payload.name,
            img: image,
            fileName: fileName
        }
        try {
            const response = await ChatService.addContact(contactPayload)
            Toast.successMsg(response.data.message)
            navigate('/chat-app')
        } catch (error) {
            Toast.errorMsg(error.data.message)
        }
    }

    const [image, setImage] = useState('');
    const [fileName, setFileName] = useState('')
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
        const formData = new FormData()
        formData.append('image', file)

        const response = await ChatService.uploadImage(formData)
        setFileName(response.data.originalname)
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <h3 className='text-success fw-bold'>Add Contact</h3>
                    <div className="col-md-6 col-lg-5 col-xl-4 mt-3">
                        <form onSubmit={handleSubmit(addContact)}>
                            <div className='mb-3'>
                                <span className='fw-bold'>Name <span className='text-danger'>*</span></span>
                                <input type="text"
                                    placeholder='Name'
                                    {...register('name')}
                                    className={`form-control ${errors.name && 'is-invalid'}`}
                                />
                                <span className="invalid-feedback">{errors.name?.message}</span>
                            </div>
                            <div>
                                <span className='fw-bold'>Image</span>
                                <input type="file"
                                    className={`form-control ${errors.img && 'is-invalid'}`}
                                    {...register('img', {
                                        onChange: handleImageUpload
                                    })}
                                />
                                <span className="invalid-feedback">{errors.img?.message}</span>
                            </div>
                            <div className="row">
                                <div className='col-md-6 mt-3 d-grid'>
                                    <Link to='/chat-app' className='btn btn-dark'>
                                        Cancel
                                    </Link>
                                </div>
                                <div className='col-md-6 mt-3 d-grid'>
                                    <button className='btn btn-success' type='submit'>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddContact