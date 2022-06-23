import Link from "next/link";
import React from "react";
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.links}>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/AddRecipe">
            Add Recipe
          </Link>
        </li>
        <li>
            <Link href="/Profile">
                Profile
            </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;