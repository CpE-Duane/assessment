import React from 'react'
import './navbar.css'

const Navbar = () => {
    return (
        <div className="chat-app-nav d-flex align-items-center container-fluid bg-success">
            <div className="container">
                <h2 className='text-white'><i className="fa fa-mobile me-3"></i> Chat App</h2>
            </div>
        </div>
    )
}

export default Navbar