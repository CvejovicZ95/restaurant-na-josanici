import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createMessage,
  fetchAllMessages,
  deleteMessage,
} from "../api/messagesApi";

export const useCreateMessage = () => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const createMessageHandler = async ({
    firstLastName,
    email,
    phoneNumber,
    question,
  }) => {
    const success = handleErrors({
      firstLastName,
      email,
      phoneNumber,
      question,
    });
    if (!success) return;

    try {
      const data = await createMessage(
        firstLastName,
        email,
        phoneNumber,
        question,
      );
      setMessage(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchAllMessagesHandler = async () => {
      try {
        const data = await fetchAllMessages();
        setAllMessages(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAllMessagesHandler();
  }, [allMessages]);

  const deleteMessageHandler = async (id) => {
    try {
      await deleteMessage(id);
      setAllMessages((prevMessages) =>
        prevMessages.filter((msg) =>
          msg._id === id ? { ...msg, deleted: true } : msg,
        ),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { message, createMessageHandler, allMessages, deleteMessageHandler };
};

function handleErrors({ firstLastName, email, phoneNumber, question }) {
  return !firstLastName || !email || !phoneNumber || !question
    ? (toast.error("Molimo popunite sva polja"), false)
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? (toast.error("Molimo unesite ispravan format e-pošte"), false)
      : !/^\+(?:[0-9] ?){6,14}[0-9]$/.test(phoneNumber)
        ? (toast.error("Molimo unesite ispravan format broja telefona"), false)
        : firstLastName.length < 6
          ? (toast.error("Molimo unesite puno ime i prezime"), false)
          : true;
}
