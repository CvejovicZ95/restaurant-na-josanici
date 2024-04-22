import React from "react";
import { Header } from "../layout/header/Header";
import { HomePage } from "../layout/homePage/HomePage";
import { Gallery } from "../layout/gallery/Gallery";
import { AboutRooms } from "../layout/aboutRooms/AboutRooms";
import { Footer } from "../layout/footer/Footer";

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
