/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MyLayout from "../../components/layout/MyLayout";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Cards from "../../components/module/Cards";
import swal from 'sweetalert'

const Profile = () => {
  const Router = useRouter();
  const [recipe, setRecipe] = useState([]);
  const [profile, setProfile] = useState([])
  const [isLogin, setIsLogin] = useState(false)
  // console.log(profile)
  async function getProfile() {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        // withCredentials : true
      }
      const result = await axios.get(`${process.env.URL}/user/profile`, config)
      // console.log(result);
      setProfile(result.data.data);
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setIsLogin(true)
    }else{
      Router.push('/auth/Login')
    }
  },[])
  async function fetchData() {
    try {
      const result = await axios({
        method: "GET",
        baseURL: process.env.URL,
        url: `/recipe`,
      });
      // console.log(result);
      setRecipe(result.data.data);
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = (idrecipe) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      // withCredentials : true
    }
    axios.delete(`${process.env.URL}/recipe/${idrecipe}`, config)
    .then(() => {
      swal("Good job!", "Delete Recipe Success!", "success");
    });
  };
  return (
    <div>
      <MyLayout title="Profile - Food Recipe" />
      <div className={styles.container}>
        <div className={styles.profileImage}>
        <img src={profile.image ? profile.image : "/assets/profile default.jpg"} alt="profile" />
        </div>
        <p>{profile.name} <span className={styles.iconEdit} onClick={() => Router.push(`/EditProfile/${profile.iduser}`)}>
            <img src='/assets/Iconsmind-Outline-Pencil.ico' alt='icon'/>
          </span></p>
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
          <div className='row row-cols-5'>
            {recipe.map((item) => (
              // eslint-disable-next-line react/jsx-key
              <div className={styles.Cards}>
                <Cards src={item.image} title={item.title} />
                <div className={styles.editBtn}>
                  <button
                    onClick={() => Router.push(`/EditRecipe/${item.idrecipe}`)}
                    className={styles.edit}
                  >
                    <img src="/assets/iconedit.png" alt="" />
                  </button>
                  <button
                    onClick={() => deleteProduct(item.idrecipe)}
                    className={styles.delete}
                  >
                    <img src="/assets/icondelete.png" alt="" />
                  </button>
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

// export async function getServerSideProps(context) {
//   const token = context.req.headers.token
//   // const tokens = localStorage.getItem('token')
//   if(!token){
//     context.res.writeHead(302, {
//       Location: `http://localhost:3000/auth/Login`
//     })
//     return {}
//   }
  // const {data:resData} = await axios.get('http://localhost:4000/v1/recipe')
  // return {
  //   props: {
  //     recipes: resData.data
  //   }, // will be passed to the page component as props
  // }
// }
export default Profile;
