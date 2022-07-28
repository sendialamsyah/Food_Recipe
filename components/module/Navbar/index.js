/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Swal from "sweetalert";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false)
  const login = () =>{
    localStorage.getItem('token')
    setIsLogin(true)
  }
  const handleLogout = async () => {
    try {
      const result = await fetch("api/Logout");
      const { logout } = await result.json();
      if (logout) {
        Swal.fire("Success", "User Logout", "success");
        router.push("/auth/Login");
      }
    } catch (error) {
      console.log(error);
    }
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
            {login?
              <Link href="auth/Login">
                <ul className={styles.liProfile}>
                  <li>
                    <img src="/assets/User icon.png" alt='icon' />
                  </li>
                  <li>
                    <p>Login</p>
                  </li>
                </ul>
              </Link>
             : 
              <ul className={styles.liProfile}>
                <li>
                  <img src="/assets/User icon.png" alt='icon' />
                </li>
                <li>
                  <p onClick={handleLogout}>Logout</p>
                </li>
              </ul>
            }
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
