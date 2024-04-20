import React from "react";
import { useCreateMessage } from "../../hooks/useCreateMessage";

export const AdminMessages = () => {
  const { allMessages, deleteMessageHandler } = useCreateMessage();

  const handleDeleteMessage = async (messageId) => {
    const confirm = window.confirm(
      "Da li ste sigurni da zelite da obrisete poruku?",
    );
    if (confirm) {
      await deleteMessageHandler(messageId);
    }
  };

  return (
    <div>
      <h1>Poruke</h1>
      <ul className="messages-list">
        {allMessages.map((message) => (
          <li
            key={message._id}
            style={{ display: message.deleted ? "none" : "block" }}
          >
            <span>Email: {message.email}</span>
            <span>Ime: {message.firstLastName}</span>
            <span>Telefon: {message.phoneNumber}</span>
            <span>Pitanje: {message.question}</span>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => handleDeleteMessage(message._id)}
              className="admin-button"
            >
              Obriši
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
