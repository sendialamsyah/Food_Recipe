/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Swal from "sweetalert";
import { useState } from "react";

const Navbar = () => {
  const Router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    Swal("Good Job!", "User Logout", "success");
    Router.push("/auth/Login");
  };
  return (
    <nav className={styles.navbar}>
      <ul className={styles.links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/AddRecipe">Add Recipe</Link>
        </li>
        <li>
          <Link href="/Profile">Profile</Link>
        </li>
      </ul>
      <ul className={styles.links}>
        <li>
          <div className={styles.profile}>
            {isLogin ? (
              <ul className={styles.liProfile}>
                <li>
                  <img src="/assets/User icon.png" alt="icon" />
                </li>
                <li>
                  <p onClick={handleLogout}>Logout</p>
                </li>
              </ul>
            ) : (
              <Link href="auth/Login">
                <ul className={styles.liProfile}>
                  <li>
                    <img src="/assets/User icon.png" alt="icon" />
                  </li>
                  <li>
                    <p>Login</p>
                  </li>
                </ul>
              </Link>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
