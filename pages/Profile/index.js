import Link from "next/link";
import React, { useEffect, useState } from "react";
import MyLayout from "../../components/layout/MyLayout";
import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const idrecipe = router.query.idrecipe;
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

  const deleteProduct = (idrecipe) => {
    axios.delete(`http://localhost:4000/v1/recipe/${idrecipe}`).then(() => {
      alert("delete success");
      fetchData();
    });
  };
  return (
    <div>
      <MyLayout title="Profile - Food Recipe" />
      <div className={styles.container}>
        <div className={styles.profileImage}>
          <img src="/assets/Ellipse 127.png" alt="profile" />
        </div>
        <p>Garneta Sharina</p>
        <div className={styles.list}>
          <ul>
            <li>
              <Link href="">My Recipe</Link>
            </li>
            <li>
              <Link href="">Saved Recipe</Link>
            </li>
            <li>
              <Link href="">Liked Recipe</Link>
            </li>
          </ul>
          <hr />
        </div>
        <div className={styles.myRecipe}>
          {recipe.map((item) => (
            <div className="row row-cols-5">
                <div className={`col ${styles.col}`}>
                  <div className={styles.cards}>
                    <img
                      src={item.image}
                      alt="img"
                      className={styles.cardImage}
                    />
                    <div className={styles.cardTitle}>
                      <p>{item.title}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => deleteProduct(item.idrecipe)}
                        className={styles.delete}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <p>
            Product &nbsp;&nbsp;&nbsp; Company &nbsp;&nbsp;&nbsp; Learn more
            &nbsp;&nbsp;&nbsp; Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
