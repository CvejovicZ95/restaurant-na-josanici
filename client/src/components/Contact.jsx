import Header from './Header'
import Footer from './Footer'

import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

import { useState } from "react"
import useCreateMessage from '../hooks/useCreateMessage';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {
  const [inputs, setInputs] = useState({
    firstLastName: '',
    email: '',
    phoneNumber: '',
    question: ''
  })

  
  const { message, createMessage } = useCreateMessage()
  const [completed,setCompleted]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessage(inputs);
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
          <span>+381 65 252-8-252</span>
          <span>+381 64 444-5-555</span>
          <IoMdMail className='react-icons' />
          <span>restorannajosanici@gmail.com</span>
          <FaLocationDot className='react-icons' />
          <span>Milunke Savić bb, Jošanička Banja</span>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
