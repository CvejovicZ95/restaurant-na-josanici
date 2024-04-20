import React, { useState, useEffect } from "react";
import { useGetWine } from "../../hooks/useGetWine.js";

export const WineAddForm = () => {
  const { uploadWineHandler, message } = useGetWine();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadWineHandler({ name, about, price, category });
    setCompleted(true);
  };

  useEffect(() => {
    if (completed) {
      setName("");
      setAbout("");
      setPrice("");
      setCategory("");
    }
  }, [completed]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Naziv artikla"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Opis"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cena"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kategorija"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          style={{ backgroundColor: "green" }}
          className="admin-button"
          type="submit"
        >
          Dodaj artikal
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};
