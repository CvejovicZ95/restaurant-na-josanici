import React, { useState } from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../../hooks/useScrollToTop";

import { useAuthContext } from "../../../context/authContext";
import { useLogout } from "../../../hooks/useAdminLogout";

import { MdClose } from "react-icons/md";
import "./Header.css";

export const Header = () => {
  const { authUser } = useAuthContext();
  const { logoutHandler } = useLogout();

  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div
        className={`menu-toggle ${isOpen ? "active" : ""}`}
        onClick={toggleNav}
      >
        {isOpen ? (
          <div className="close-icon">
            <MdClose style={{ fontSize: "30px", marginBottom: "10px" }} />
          </div>
        ) : (
          <>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </>
        )}
      </div>
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <ul className="nav-ul">
          <Link to={"/menu"} onClick={scrollToTop}>
            <li className="nav-li">JELOVNIK</li>
          </Link>

          <Link to={"/wine"} onClick={scrollToTop}>
            <li className="nav-li">VINSKA KARTA</li>
          </Link>

          <Link to={"/"}>
            <li className="nav-li" onClick={() => handleNavClick("about-res")}>
              O RESTORANU
            </li>
          </Link>

          <Link to={"/"}>
            <li className="nav-li-img">
              <img
                className="img-logo"
                style={{ textDecoration: "none" }}
                src="/josanica.png"
                alt="logo"
                width={"170px"}
                onClick={scrollToTop}
              />
            </li>
          </Link>

          <Link to={"/rooms"} onClick={scrollToTop}>
            <li className="nav-li">SOBE NA JOŠANICI</li>
          </Link>

          <Link to={"/"}>
            <li className="nav-li" onClick={() => handleNavClick("gallery")}>
              GALERIJA
            </li>
          </Link>

          <Link to={"/contact"} onClick={scrollToTop}>
            <li className="nav-li">KONTAKT</li>
          </Link>

          {authUser && (
            <Link to={"/allReservations"}>
              <li className="nav-li">Rezervacije</li>
            </Link>
          )}

          {authUser && (
            <Link to={"/"} onClick={logoutHandler}>
              <li className="nav-li">Izloguj se</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};
