import {Header} from "../Layout/Header/Header.jsx"
import {Footer} from "../Layout/Footer/Footer.jsx"

import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

import { useState } from "react"
import {useCreateMessage} from "../../hooks/useCreateMessage.js"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import "./Contact.css";
import config from '../../config.json'

const Contact = () => {
  const [inputs, setInputs] = useState({
    firstLastName: '',
    email: '',
    phoneNumber: '',
    question: ''
  })

  
  const { message, createMessageHandler } = useCreateMessage()
  const [completed,setCompleted]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessageHandler(inputs);
      setInputs({
        firstLastName: '',
        email: '',
        phoneNumber: '',
        question: ''
      });
      setCompleted(true)
      setTimeout(() => {
        setCompleted(false);
      }, 5000);
    }
    
  

  return (
    <div>
      <Header />
      <div className='contact'>
        <h1>KONTAKTIRAJTE NAS</h1>
        <p>Ukoliko imate neka pitanja ili sugestije za nas, molimo Vas, javite nam se.</p>
        <div>
          <form className='ask-form' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Ime i prezime'
              value={inputs.firstLastName}
              onChange={(e) => setInputs({ ...inputs, firstLastName: e.target.value })}
            />
            <input
              type='email'
              placeholder='Email'
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <input
              type='text'
              placeholder='+381 64 2233555'
              value={inputs.phoneNumber}
              onChange={(e) => setInputs({ ...inputs, phoneNumber: e.target.value })}
            />
            <textarea
              className='textarea'
              type='text'
              placeholder='Vaš upit'
              value={inputs.question}
              onChange={(e) => setInputs({ ...inputs, question: e.target.value })}
            />
            <button type='submit'>Pošalji upit</button>
          </form>
          {completed && message && <p style={{ color: 'green', textAlign:'center' }}>Poruka uspešno poslata</p>}
          <ToastContainer />
          
        </div>
        <div className='contact-info'>
          <FaPhone className='react-icons' />
          <span>{config.phoneNumber2}</span>
          <span>{config.phoneNumber3}</span>
          <IoMdMail className='react-icons' />
          <span>{config.email}</span>
          <FaLocationDot className='react-icons' />
          <span>{config.adress}</span>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export {Contact}
