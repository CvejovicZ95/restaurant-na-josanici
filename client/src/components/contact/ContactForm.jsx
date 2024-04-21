import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateMessage } from "../../hooks/useCreateMessage";

export const ContactForm = () => {
  const [firstLastName, setFirstLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [question, setQuestion] = useState("");
  const [completed, setCompleted] = useState(false);

  const { message, createMessageHandler } = useCreateMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessageHandler({ firstLastName, email, phoneNumber, question });
    setFirstLastName("");
    setEmail("");
    setPhoneNumber("");
    setQuestion("");
    setCompleted(true);

    setTimeout(() => {
      setCompleted(false);
    }, 5000);
  };
  return (
    <div>
      <form className="ask-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ime i prezime"
          value={firstLastName}
          onChange={(e) => setFirstLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="+381 64 2233555"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <textarea
          className="textarea"
          type="text"
          placeholder="Vaš upit"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Pošalji upit</button>
      </form>
      {completed && message && (
        <p style={{ color: "green", textAlign: "center" }}>
          Poruka uspešno poslata
        </p>
      )}
      <ToastContainer />
    </div>
  );
};
