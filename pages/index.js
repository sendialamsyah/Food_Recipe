import React, { useEffect, useState } from "react";
import MyLayout from "../components/layout/MyLayout";
import styles from "../styles/Home.module.css";
import Footer from "../components/module/Footer";
import axios from "axios";
import Link from 'next/link';

const Home = () => {
  const [recipe, setRecipe] = useState([]);
  async function fetchData() {
    try {
      const result = await axios({
        method: "GET",
        baseURL: "http://localhost:4000/v1",
        url: `/recipe`,
      });
      console.log(result);
      setRecipe(result.data.data);
    } catch (error) {
      // console.log(error.response);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <MyLayout title="Home - Food Recipe" />
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Discover Recipe</h1>
          <h2>& Delicious Food</h2>
          <input type="text" placeholder="Search Recipe" />
        </div>
        
        <div className={styles.layer1}></div>
        <div className={styles.imageLettuce}>
          <img src="/assets/lettuce.png" alt="lettuce" />
        </div>
        <Link href='auth/Login'>
        <div className={styles.profile}>
          <img src='/assets/User icon.png'/>
          <p>Login</p>
        </div>
        </Link>
        <div className={styles.imageSalad}>
          <img src="/assets/salad.png" alt="salad" />
        </div>
      </div>
      <div className={styles.popularRecipe}>
        <div className={styles.box2}></div>
        <h1>Popular Recipe</h1>
      </div>
      {recipe.map((item)=>(
        <div className="row row-cols-5">
          <Link href={`/DetailRecipe/${item.idrecipe}}`}>
          <div className={`col ${styles.col}`}>
            <div className={styles.cards}>
              <img src={item.image} alt='img' className={styles.cardImage}/>
              <div className={styles.cardTitle}>
              <p>{item.title}</p>
              </div>
            </div>
          </div>
      </Link>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Home;
