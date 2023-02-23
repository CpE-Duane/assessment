const mongoose = require('mongoose')

const Contacts = new mongoose.Schema({
    name: { type: String, required: true},
    img: { type: String},
    fileName: {type: String}
}, { collection: 'contacts-data' })

const contactsModel = mongoose.model('ContactsData', Contacts)

module.exports = contactsModel