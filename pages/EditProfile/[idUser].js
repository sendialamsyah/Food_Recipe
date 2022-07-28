/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MyLayout from "../../components/layout/MyLayout";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import swal from "sweetalert";
import Input from "../../components/base/Input";
import Button from "../../components/base/Button";

const Profile = () => {
  const Router = useRouter();
  const idUser = Router.query.idUser;
  const [profile, setProfile] = useState([]);
  async function getProfile(idUser) {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        // withCredentials : true
      };
      const result = await axios.get(
        `${process.env.URL}/user/${idUser}`,
        config
      );
      // console.log(result);
      setProfile(result.data.data);
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    getProfile(idUser);
  }, [idUser]);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangeImage = (e) => {
    setImage({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      // withCredentials : true
    };
    await axios
      .put(`${process.env.URL}/user/${idUser}`, formData, config)
      .then(() => {
        swal("Good job!", "Update Success!", "success");
        Router.push("/Profile");
      })
      .catch((error) => {
        swal("Update Failed", "", "error");
        console.log(error);
      });
  };

  return (
    <div>
      <MyLayout title="Profile - Food Recipe" />
      <div className={styles.container}>
        <div className={styles.profileImage}>
          <img
            src={profile.image ? profile.image : "/assets/profile default.jpg"}
            alt="profile"
          />
        </div>
        <p>{profile.name}</p>
        <div className={styles.list}>
          <ul>
            <li>
              <Link href="">Edit Profile</Link>
            </li>
          </ul>
          <hr />
        </div>
        <div className={styles.myProfile}>
          <form onSubmit={handleEdit}>
            <div className={styles.insertImage}>
              <img
                src={
                  image.preview ? image.preview : "/assets/profile default.jpg"
                }
                alt="img"
              />
            </div>
            <div className={styles.uploadImg}>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/png, image/jpeg"
                onChange={handleChangeImage}
              />
            </div>
            <label htmlFor="name">Name</label>
            <Input
              type="name"
              name="name"
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="phoneNumber">PhoneNumber</label>
            <Input
              type="phoneNumber"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              placeholder="PhoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {/* <Button title="Log In" width='300px' height='40px' onClick={()=>router.push('/')}/> */}
            <Button title="Submit" width="300px" height="40px" type="submit" />
          </form>
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
