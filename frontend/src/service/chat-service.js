import axios from 'axios'

let serverUrl = 'http://localhost:5000'

const registerUser = (payload) => {
    return axios.post(`${serverUrl}/api/register`, payload)
}

const loginUser = (payload) => {
    return axios.post(`${serverUrl}/api/login`, payload)
}

const getContacts = () => {
    return axios.get(`${serverUrl}/api/contacts`)
}

const addContact = (payload) => {
    return axios.post(`${serverUrl}/api/contacts`, payload)
}

const deleteContact = (contactId) => {
    return axios.delete(`${serverUrl}/api/contacts/${contactId}`)
}

const getContact = (contactId) => {
    return axios.get(`${serverUrl}/api/contacts/${contactId}`)
}

const updateContact = (contactId, payload) => {
    return axios.put(`${serverUrl}/api/contacts/${contactId}`, payload)
}

const uploadImage = (formData) => {
    return axios.post(`${serverUrl}/upload`, formData)
}

const ChatService = {
    registerUser,
    loginUser,
    getContacts,
    addContact,
    deleteContact,
    getContact,
    updateContact,
    uploadImage
}

export default ChatService