import Link from "next/link";
import React, { useEffect, useState } from "react";
import MyLayout from "../../components/layout/MyLayout";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import {useRouter} from 'next/router'

const Profile = () => {
  const Router = useRouter()
  const [recipe, setRecipe] = useState([]);
  async function fetchData() {
    try {
      const result = await axios({
        method: "GET",
        baseURL: 'http://localhost:4000/v1',
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
      alert("delete recipe success");
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
        <div className={`row row-cols-5 ${styles.warpperCard}`}>
          {recipe.map((item) => (
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
                    <div className={styles.editBtn}>
                      <button onClick={()=>Router.push(`/EditRecipe/${item.idrecipe}`)} className={styles.edit}><img src="/assets/iconedit.png" alt="" /></button>
                      <button
                        onClick={() => deleteProduct(item.idrecipe)}
                        className={styles.delete}>
                        <img src="/assets/icondelete.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
          ))}
          </div>
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
