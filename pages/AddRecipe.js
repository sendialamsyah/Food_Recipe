import MyLayout from '../components/layout/MyLayout'
import styles from '../styles/AddRecipe.module.css'
import Button from '../components/base/Button'
import Footer from '../components/module/Footer'
import { useState } from "react";
import axios from 'axios'

const AddRecipe = () => {
    const [insertRecipe, setInsertRecipe] = useState({
        image: '',
        preview: '',
        title: '',
        ingredients: ''
      })
      const handleChange=(e)=>{
        setInsertRecipe({
          ...insertRecipe,
          [e.target.name]: e.target.value
        })
      }
      const handleChangeFile = (e) => {
        setInsertRecipe({
          image: e.target.files[0],
          preview: URL.createObjectURL(e.target.files[0])
        })
      };
      const handlePost=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/v1/recipe', insertRecipe)
        .then(()=>{
            alert('insert data success')
        })
        .catch((error)=>{
            alert('insert data failed')
            console.log(error)
        })
      }
  return (
    <div>
        <MyLayout title='Add Recipe - Food Recipe'/>
        <form onClick={handlePost}>
            <div className={styles.addImage}>
                <div className={styles.image}>
                    <img src={insertRecipe.preview} alt='img'/>
                    <input type="file" name="image" id="image" onChange={handleChangeFile} />
                </div>
            </div>
            <div className={styles.inputTitle}>
                <input type="text" name='title' id='title' value={insertRecipe.title} placeholder='Title' onChange={handleChange}/>
            </div>
            <div className={styles.inputIngredients}>
                <textarea name="ingredients" id="ingredients" value={insertRecipe.ingredients} cols="100%" rows="100%" placeholder='Ingredients' onChange={handleChange}></textarea>
            </div>
            <div className={styles.addVideo}>
                <input type="text" name="video" id="video" placeholder='Video' />
            </div>
            <div className={styles.btnPost}>
                <Button title='Post' width='250px' height='40px' type='submit'/>
            </div>
            </form>
            <Footer/>
    </div>
  )
}

export default AddRecipe