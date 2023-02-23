const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Contacts = require('./models/contacts.model')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require('path');

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://0.0.0.0:27017/assessment').then((response) => {
  console.log("Connected to MongoDB")
}).catch((error) => {
  console.log(error)
})

// register user
app.post('/api/register', async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    res.status(200).send({ message: "Register Successful" });

  } catch (error) {
    res.status(500).send({ message: "Email already exist. Please login your account." });
  }
})

// login user
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    })
    if (user) {
      const token = jwt.sign({
        email: user.email
      }, 'secret123')

      res.status(200).send({ message: "Login Successful" });
    } else {
      res.status(500).send({ message: "Invalid username or Password" });
    }
  }
  catch (error) {
    res.status(500).send({ message: "Invalid username or Password" });
  }
})

// add contact
app.post('/api/contacts', async (req, res) => {
  try {
    await Contacts.create({
      name: req.body.name,
      img: req.body.img,
      fileName: req.body.fileName
    })
    res.status(200).send({ message: "Contact added successfully" });

  } catch (error) {
    res.status(500).send({ message: "Error adding contact" });
  }
})

// update contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedContact = req.body;

    await Contacts.findByIdAndUpdate(contactId, updatedContact);
    res.status(200).send({ message: "Contact updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating contact." });
  }
});

// delete contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    await Contacts.findByIdAndDelete(contactId);
    res.status(200).send({ message: "Contact Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleteing contact" });
  }
});

// get specific contact by id
app.get('/api/contacts/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const contact = await Contacts.findOne({ _id: id });
    if (!contact) {
      return res.status(404).send({ message: 'Contact not found.' });
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});


// get contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contacts.find({});
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// for image upload
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, './uploads/');
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.status(200).send(req.file);
  } else {
    res.status(400).json({ error: 'Invalid file format.' });
  }
});



app.listen(5000, () => {
  console.log('Server started in Port 5000')
})





