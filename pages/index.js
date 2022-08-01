/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import MyLayout from "../components/layout/MyLayout";
import styles from "../styles/Home.module.css";
import Footer from "../components/module/Footer";
import Button from "../components/base/Button";
import axios from "axios";
import Link from "next/link";
import Cards from "../components/module/Cards";
import { useRouter } from "next/router";

const Home = ({ recipes, pagination }) => {
  const Router = useRouter();

  const [page, setPage] = useState({
    page: pagination.page,
    limit: pagination.limit,
  });
  const [keySearch, setKeySearch] = useState("");

  const onHandleChange = (e) => {
    setKeySearch((e.target.name = e.target.value));
  };

  const onHandleSearch = () => {
    Router.push(`?search=${keySearch}`);
  };

  const buttonPagination = [];
  for (let i = 0; i < pagination.totalPage; i++) {
    buttonPagination.push(
      <Button
      width='30px'
      height='30px'
        onClick={() => {
          setPage((current) => ({ ...current, page: i + 1 }));
          Router.push(`/?page=${i + 1}&limit=${page.limit}`);
        }}
        title={i + 1}
      >
      </Button>
    );
  }

  const option = ["ASC", "DESC"];
  return (
    <div>
      <MyLayout title="Home - Food Recipe" />
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Discover Recipe</h1>
          <h2>& Delicious Food</h2>
          <input
            type="text"
            placeholder="Search Recipe"
            value={keySearch}
            onChange={(e) => onHandleChange(e)}
          />
          <Button
            onClick={onHandleSearch}
            width="100px"
            height="50px"
            title="Find"
            className={styles.btnSearch}
          >
            <i></i>
          </Button>
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
      <div className={styles.btnSort}>
        <select name="sort" id="sort" onChange={(e) => {
                    e.target.value !== "none" && Router.push(`/?sortby=${"title"}&sort=${e.target.value}`);
                  }}>
                  <option value="none">Sort by Title</option>
                  <option value="ASC">(A-Z)</option>
                  <option value="DESC">(Z-A)</option>

        </select>
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
        <div className={styles.btnPagination}>{buttonPagination}</div>
      <Footer />
    </div>
  );
};
export async function getServerSideProps(context) {
  let page = 1;
  let limit = 5;
  let search;
  let sort;
  let sortby;
  if (context.query.page || context.query.limit) {
    page = context.query.page;
    limit = context.query.limit;
  }

  if (context.query.search) {
    search = context.query.search;
  }

  if (context.query.sort && context.query.sortby) {
    sort = context.query.sort;
    sortby = context.query.sortby;
  }
  // const cookie = context.req.headers.cookie
  // if(!cookie){
  //   context.res.writeHead(302, {
  //     Location: `http://localhost:3000/auth/Login`
  //   })
  //   return {}
  // }
  const { data: resData } = await axios.get(
    `${process.env.URL}/recipe?page=${page}&limit=${limit}${
      search && `&search=${search}`
    }`
  );

  if (sort !== undefined && sortby != undefined) {
    const { data: resData } = await axios.get(
      `${process.env.URL}/recipe?page=${page}&limit=${limit}${
        sortby && `&sortby=${sortby}`
      }${sort && `&sort=${sort}`}`
    );
    return {
      props: {
        recipes: resData.data,
        pagination: resData.pagination,
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {
      recipes: resData.data,
      pagination: resData.pagination,
    }, // will be passed to the page component as props
  };
}
export default Home;
