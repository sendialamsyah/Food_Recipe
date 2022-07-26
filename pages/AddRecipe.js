import MyLayout from "../components/layout/MyLayout";
import styles from "../styles/AddRecipe.module.css";
import Button from "../components/base/Button";
import Footer from "../components/module/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import TextArea from '../components/base/TextArea'
import swal from 'sweetalert'

const AddRecipe = () => {
  const Router = useRouter()
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [video, setVideo] = useState("");

  const handleChangeImage = (e) => {
    setImage({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleChangeVideo = (e) => {
    setVideo({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("video", video.file); 
    //  await axios
    //   .post("http://localhost:4000/v1/recipe", formData, {
    //     "content-type": "multipart/form-data", withCredentials: true
    //   })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      // withCredentials : true
    }
    await axios
      .post("http://localhost:4000/v1/recipe", formData, config)
      .then(() => {
        swal("Good job!", "Insert Recipe Success!", "success");
        Router.push("/Profile");
        
      })
      .catch((error) => {
        swal("Insert Recipe Failed", "", "error");
        console.log(error);
      });
  };

  return (
    <div>
      <MyLayout title="Add Recipe - Food Recipe" />
      <form onSubmit={handlePost}>
        <div className={styles.addImage}>
          <div className={styles.image}>
            {image.preview?
            <img src={image.preview} alt="img" width='100%' height='100%' /> :
            <img src="/assets/icon/add image.png" alt="img" width= '70px' />
            }
            <input
              type="file"
              name="image"
              id="image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChangeImage}
            />
          </div>
        </div>
        <div className={styles.inputTitle}>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputIngredients}>
          <TextArea
            name="ingredients"
            id="ingredients"
            value={ingredients}
            cols="100%"
            rows="100%"
            placeholder="Ingredients"
            onChange={(e) => setIngredients(e.target.value)}
          ></TextArea>
        </div>
        <div className={styles.addVideo}>
          <input
            type="file"
            name="video"
            id="video"
            placeholder="Video"
            accept="video/mp4"
            onChange={handleChangeVideo}
          />
        </div>
        <div className={styles.btnPost}>
          <Button title="Post" width="250px" height="40px" type="submit" />
        </div>
      </form>
      <Footer />
    </div>
  );
};
// export async function getServerSideProps(context) {
//   const cookie = context.req.headers.cookie
//   if(!cookie){
//     context.res.writeHead(302, {
//       Location: `http://localhost:3000/auth/Login`
//     })
//     return {}
//   }
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
export default AddRecipe;
