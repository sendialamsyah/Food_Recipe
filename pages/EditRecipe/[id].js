/* eslint-disable @next/next/no-img-element */
import MyLayout from "../../components/layout/MyLayout";
import styles from "../../styles/AddRecipe.module.css";
import Button from "../../components/base/Button";
import Footer from "../../components/module/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

const EditRecipe = () => {
    const Router = useRouter()
    const id = Router.query.id
    const [editRecipe, setEditRecipe] = useState([]);
  async function fetchData(id) {
    try {
      const result = await axios({
        method: "GET",
        baseURL: process.env.URL,
        url: `/recipe/${id}`,
      });
      // console.log(result);
      setEditRecipe(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData(id);
  }, [id]);
  
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
    //   .put(`http://localhost:4000/v1/recipe/${id}`, formData, {
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
      .put(`${process.env.URL}/recipe/${id}`, formData, config)
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
              onChange={handleChangeImage}
            />
          </div>
        </div>
        <div className={styles.inputTitle}>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={editRecipe.title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputIngredients}>
          <textarea
            name="ingredients"
            id="ingredients"
            defaultValue={editRecipe.ingredients}
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

export default EditRecipe;
