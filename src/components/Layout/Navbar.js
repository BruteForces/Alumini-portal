import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { useWindowScrollPositions } from "hooks/useWindowScrollPositions";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Navbar = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [menuActive, setMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  if (useWindowScrollPositions().scrollY > 30 && !isScrolled) {
    setIsScrolled(true);
  }
  if (useWindowScrollPositions().scrollY < 30 && isScrolled) {
    setIsScrolled(false);
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.navbar} ${styles.background_blur} ${isScrolled && styles.scrolled
            }`}
        >
          {windowDimensions.width > 790 && (
            <div className={`${styles.navLink}`}>
              <Link to="/">Home</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/events">Events</Link>
            </div>
          )}
          {windowDimensions.width > 790 ? (
            <div className={styles["navbar-brand"]}>
              <div className={styles["navbar-logo"]}>
                <img src={require("assets/Logo1.png")} alt="SKI logo" />
              </div>
              <div className={styles["titleText"]}>
                <h1>SRI KRISHNA COLLEGE OF TECHNOLOGY</h1>
                <h3>
                  AUTONOMOUS INSTITUTION | ACCREDITED BY NAAC WITH ‘A’ GRADE
                </h3>
              </div>
              <div className={styles["navbar-logo"]}>
                <img src={require("assets/Logo2.png")} alt="SKCT logo" />
              </div>
            </div>
          ) : (
            <div className={styles["navbar-brand"]}>
              {windowDimensions.width > 350 && (
                <div className={styles["navbar-logo"]}>
                  <img src={require("assets/Logo2.png")} alt="SKCT logo" />
                  <hr />
                </div>
              )}
              <div className={styles["titleText"]}>
                <p>SKCT</p>
              </div>
            </div>
          )}
          {windowDimensions.width > 790 ? (
            <div className={`${styles.navLink} ${styles.right}`}>
              <Link to="/admin">Admin</Link>
              <Link to="/alumni-forum">Alumni Forum</Link>
              <Link to="/office-bearers">Office Bearers</Link>
            </div>
          ) : (
            <div className={`${styles.dropdown} `}>
              {!menuActive && (
                <MenuIcon
                  className={styles["dropdown-btn"]}
                  onClick={() => {
                    setMenuActive(true);
                  }}
                />
              )}
            </div>
          )}
        </div>
        {menuActive && windowDimensions.width < 790 && (
          <Menu setMenuActive={setMenuActive} />
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
