import React, { useEffect, useState } from 'react'
import './chatpage.css'
import ChatService from '../../service/chat-service';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom'
import Toast from '../../toast-msg/ToastMessage';

const ChatPage = () => {

  let [contacts, setContacts] = useState([])
  const [selectedPerson, setSelectedPerson] = useState({})

  const getContacts = async () => {
    const response = await ChatService.getContacts()
    setContacts(response.data)
  }

  useEffect(() => {
    getContacts()
  }, [])

  const deleteContact = async (contactId) => {
    try {
      await ChatService.deleteContact(contactId)
      Toast.successMsg("Contact Deleted.")
      getContacts()
    } catch (error) {
      Toast.errorMsg(error)
    }
  }

  // select people to chat
  const chatContact = (contact) => {
    setSelectedPerson(contact)
  }


  return (
    <div className='chat-app'>
      <Navbar />
      <div className="msg-box container bg-light">
        <div className="row">
          <div className="contacts col-md-5 col-lg-4 contact-list py-3 px-2">
            <div className='d-flex justify-content-between'>
              <h4 className='fw-bold text-success'>Contacts</h4>
              <Link to='/new-contact' className="btn btn-outline-success mb-3">
                Add Contact
              </Link>
            </div>
            <div>
              {
                contacts.map((contact) => {
                  return (
                    <div key={contact._id} className='contact d-flex justify-content-between align-items-center mt-3 py-2' onClick={() => chatContact(contact)}>
                      <div className='d-flex align-items-center'>
                        <img src={contact.img} alt="Pic" />
                        <h6 className='ms-3 text-success fw-bold'>{contact.name}</h6>
                      </div>
                      <div className='d-flex'>
                        <Link to={`/update-contact/${contact._id}`} className="fa fa-edit text-success"></Link>
                        <i className="fa fa-trash text-danger mx-3" onClick={() => deleteContact(contact._id)}></i>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {
            Object.keys(selectedPerson).length > 0 &&
            <div className="chatbox col-md-7 col-lg-8">
              {/* chat header */}
              <div className="row">
                <div className="chatbox-header py-3 d-flex justify-content-between">
                  <div className='d-flex align-items-center'>
                    <img src={selectedPerson.img} alt="Pic" className='me-4' />
                    <h4 className='fw-bold'>{selectedPerson.name}</h4>
                  </div>
                  <div className='d-flex align-items-center text-success'>
                    <i className="fa fa-phone fa-2x"></i>
                    <i className="fa fa-video-camera fa-2x ms-4"></i>
                  </div>
                </div>
              </div>
              {/* chat input */}
              <div className="row chat-input">
                <div className="col">
                  <div className='d-flex align-items-center'>
                    <input type="text" placeholder='Aa' className='form-control outline-0' />
                    <i className="fa fa-paper-plane text-success ms-2 fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>





    </div>
  )
}

export default ChatPage