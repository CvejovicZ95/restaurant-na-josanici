import React from "react";
import { Header } from "../layout/header/Header.jsx";
import { HomePage } from "../layout/homePage/HomePage.jsx";
import { Gallery } from "../layout/gallery/Gallery.jsx";
import { AboutRooms } from "../layout/aboutRooms/AboutRooms.jsx";
import { Footer } from "../layout/footer/Footer.jsx";

export const Layout = () => {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Gallery />
      <AboutRooms />
      <Footer />
    </div>
  );
};
