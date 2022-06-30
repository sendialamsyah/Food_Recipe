import MyLayout from "../components/layout/MyLayout";
import styles from "../styles/AddRecipe.module.css";
import Button from "../components/base/Button";
import Footer from "../components/module/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

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
     await axios
      .post("http://localhost:4000/v1/recipe", formData, {
        "content-type": "multipart/form-data", withCredentials: true
      })
      .then(() => {
        Router.push("/Profile");
        alert("insert recipe success");
      })
      .catch((error) => {
        alert("insert recipe failed");
        console.log(error);
      });
  };

  return (
    <div>
      <MyLayout title="Add Recipe - Food Recipe" />
      <form onSubmit={handlePost}>
        <div className={styles.addImage}>
          <div className={styles.image}>
            <img src={image.preview} alt="img" />
            <input
              type="file"
              name="image"
              id="image"
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
          <textarea
            name="ingredients"
            id="ingredients"
            value={ingredients}
            cols="100%"
            rows="100%"
            placeholder="Ingredients"
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.addVideo}>
          <input
            type="file"
            name="video"
            id="video"
            placeholder="Video"
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
export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie
  if(!cookie){
    context.res.writeHead(302, {
      Location: `http://localhost:3000/auth/Login`
    })
    return {}
  }
  return {
    props: {}, // will be passed to the page component as props
  }
}
export default AddRecipe;
