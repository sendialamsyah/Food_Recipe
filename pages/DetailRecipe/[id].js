/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import MyLayout from "../../components/layout/MyLayout";
import styles from "../../styles/DetailRecipe.module.css";
import Button from "../../components/base/Button";
import Footer from "../../components/module/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const detailRecipe = () => {
  const Router = useRouter();
  const id = Router.query.id;
  const [detailRecipe, setDetailRecipe] = useState([]);
  async function fetchData(id) {
    try {
      const result = await axios({
        method: "GET",
        baseURL: process.env.URL,
        url: `/recipe/${id}`,
      });
      console.log(result);
      setDetailRecipe(result.data.data);
    } catch (error) {
      // console.log(error.response);
    }
  }
  useEffect(() => {
    fetchData(id);
  }, [id]);
  return (
    <div className={styles.container}>
      <MyLayout title="Detail Recipe - Food Recipe" />
      <div className="container">
        <div className={styles.title}>
          <h1>{detailRecipe.title}</h1>
          <div className={styles.image}>
            {/* <img src='/assets/Rectangle 313.png'/> */}
            <img src={detailRecipe.image} />
          </div>
        </div>
        <div className={styles.ingredients}>
          <h4>Ingredients</h4>
          <div>{detailRecipe.ingredients}</div>
          <h4>Video Step</h4>
          <Button
            title={<img src="/assets/Vector (2).png" />}
            width="300px"
            height="50px"
            onClick={()=>Router.push(detailRecipe.video)}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default detailRecipe;
