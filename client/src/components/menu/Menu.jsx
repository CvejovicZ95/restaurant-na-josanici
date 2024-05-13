import React from "react";
import { Header } from "../layout/header/Header";
import { Footer } from "../layout/footer/Footer";
import { MenuAddForm } from "./MenuAddForm";
import { useGetFood } from "../../hooks/useGetFood";
import { useState, useEffect } from "react";

import { useAuthContext } from "../../context/authContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./MenuAndWine.css";

export const Menu = () => {
  const { authUser } = useAuthContext();

  const { food, deleteFoodHandler, updateFoodHandler } = useGetFood();

  const [loaded, setLoaded] = useState(false);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedAbout, setUpdatedAbout] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  // eslint-disable-next-line
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleUpdate = (item) => {
    setSelectedFood(item);
    setUpdatedName(item.name);
    setUpdatedAbout(item.about);
    setUpdatedPrice(item.price);
  };

  const handleSaveUpdate = async (id) => {
    try {
      await updateFoodHandler(id, updatedName, updatedAbout, updatedPrice);
      setSelectedFood(null);
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
        await deleteFoodHandler(id);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className={`menu ${loaded ? "fade-in" : ""}`}>
        <div className="menu-grid">
          <img src="pasta.png" alt="Food" className="food-image-left" />
          <div className="food-list">
            {authUser && <MenuAddForm />}
            <h1>Menu</h1>
            {Object.keys(food).map((category) => (
              <div key={category}>
                <h2 className="food-category">{category}</h2>
                {food[category].map(
                  (item) =>
                    !item.deleted && (
                      <div key={item._id} className="single-food">
                        <div className="food-name-price">
                          <span className="food-name">{item.name}</span>
                          <label className="food-price">{item.price}</label>
                        </div>
                        <p className="about-food">{item.about}</p>
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

                        {selectedFood && selectedFood._id === item._id && (
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
                    ),
                )}
              </div>
            ))}
          </div>
          <img src="beef.png" alt="Food" className="food-image-right" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
