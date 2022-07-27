/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import MyLayout from "../components/layout/MyLayout";
import styles from "../styles/Home.module.css";
import Footer from "../components/module/Footer";
import axios from "axios";
import Link from "next/link";
import Cards from "../components/module/Cards";
import { useRouter } from "next/router";

const Home = ({ recipes }) => {
  const Router = useRouter();

  const [page, setPage] = useState({
    currentPage: 1,
    limit: 10,
    sortby: "price",
    sort: "",
    search: "",
  });

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
        <div className={styles.imageSalad}>
          <img src="/assets/salad.png" alt="salad" />
        </div>
      </div>
      <div className={styles.popularRecipe}>
        <div className={styles.box2}></div>
        <h1>Popular Recipe</h1>
      </div>
      <div className={styles.warpperCard}>
        <div className={`row row-cols-5 ${styles.row}`}>
          {recipes.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <button
                onClick={() => Router.push(`DetailRecipe/${item.idrecipe}`)}
                className={styles.btnDetail}
              >
                <Cards src={item.image} title={item.title} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export async function getServerSideProps(context) {
  // const cookie = context.req.headers.cookie
  // if(!cookie){
  //   context.res.writeHead(302, {
  //     Location: `http://localhost:3000/auth/Login`
  //   })
  //   return {}
  // }
  const { data: resData } = await axios.get(
    `${process.env.URL}/recipe`
  );
  return {
    props: {
      recipes: resData.data,
    }, // will be passed to the page component as props
  };
}
export default Home;
