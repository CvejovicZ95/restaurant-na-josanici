import React, { useState, useEffect } from "react";
import { Header } from "../layout/header/Header";
import { Footer } from "../layout/footer/Footer";
import { WineAddForm } from "./WineAddForm";
import { useGetWine } from "../../hooks/useGetWine";

import { useAuthContext } from "../../context/authContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Wine = () => {
  const { authUser } = useAuthContext();

  const { wine, deleteWineHandler, updateWineHandler } = useGetWine();

  const [loaded, setLoaded] = useState(false);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedAbout, setUpdatedAbout] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [selectedWine, setSelectedWine] = useState(null);
  // eslint-disable-next-line
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleUpdate = (item) => {
    setSelectedWine(item);
    setUpdatedName(item.name);
    setUpdatedAbout(item.about);
    setUpdatedPrice(item.price);
  };

  const handleSaveUpdate = async (id) => {
    try {
      await updateWineHandler(id, updatedName, updatedAbout, updatedPrice);
      setSelectedWine(null);
      setIsUpdating(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    const alert = window.confirm(
      "Jeste sigurno da zelite da izbrisete artikal?",
    );
    if (alert) {
      try {
        await deleteWineHandler(id);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className={`wine ${loaded ? "fade-in" : ""}`}>
        <div className="wine-grid">
          <img
            src="/images/grapes.png"
            alt="wine"
            className="wine-image-left"
          />
          <div className="wine-list">
            <h1>Vina</h1>
            {authUser && <WineAddForm />}
            {Object.keys(wine).map((category) => (
              <div key={category}>
                <h2 className="wine-category">{category}</h2>
                {wine[category].map((item) => (
                  <div key={item._id} className="single-wine">
                    <div className="wine-name-price">
                      <span className="wine-name">{item.name}</span>
                      <label className="wine-price">{item.price}</label>
                    </div>
                    <p className="about-wine">{item.about}</p>
                    {authUser && (
                      <div>
                        <button
                          style={{ backgroundColor: "blue" }}
                          className="admin-button"
                          onClick={() => handleUpdate(item)}
                        >
                          Promeni
                        </button>

                        <button
                          style={{ backgroundColor: "red" }}
                          className="admin-button"
                          onClick={() => handleDelete(item._id)}
                        >
                          Obriši
                        </button>
                      </div>
                    )}

                    {selectedWine && selectedWine._id === item._id && (
                      <div className="update-div">
                        <input
                          className="update-input"
                          type="text"
                          value={updatedName}
                          onChange={(e) => setUpdatedName(e.target.value)}
                          placeholder="Naziv artikla"
                        />
                        <textarea
                          className="update-area"
                          value={updatedAbout}
                          onChange={(e) => setUpdatedAbout(e.target.value)}
                          placeholder="Opis"
                        />
                        <input
                          className="update-input"
                          type="text"
                          value={updatedPrice}
                          onChange={(e) => setUpdatedPrice(e.target.value)}
                          placeholder="Cena"
                        />
                        <button
                          style={{ backgroundColor: "green" }}
                          className="admin-button"
                          onClick={() => handleSaveUpdate(item._id)}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <img src="/images/wine.png" alt="Wine" className="wine-image-right" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
