import MyLayout from '../../components/layout/MyLayout'
import styles from '../../styles/DetailRecipe.module.css'
import Button from '../../components/base/Button'
import Footer from '../../components/module/Footer'
import {useRouter} from 'next/router'
import { useEffect, useState } from "react";
import axios from 'axios'

const detailRecipe = () => {
    const router = useRouter()
    const idrecipe = router.query.idrecipe
    const [detailRecipe, setDetailRecipe] = useState([]);
  async function fetchData() {
    try {
      const result = await axios({
        method: "GET",
        baseURL: "http://localhost:4000/v1",
        url: `/recipe/${idrecipe}`,
      });
      console.log(result);
      setDetailRecipe(result.data.data);
    } catch (error) {
      // console.log(error.response);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
        <MyLayout title='Detail Recipe - Food Recipe'/>
        <div className='container'>
            <div className={styles.title}>
                <h1>Loream Sandwich</h1>
                <div className={styles.image}>
                <img src='/assets/Rectangle 313.png'/>
                </div>
            </div>
            <div className={styles.ingredients}>
                <h4>Ingredients</h4>
                <div>
                    -2 Eggs
                </div>
                <h4>Video Step</h4>
                <Button title={<img src='/assets/Vector (2).png'/>} width='200px' height='30px'/>
                <Button title={<img src='/assets/Vector (2).png'/>} width='200px' height='30px'/>
                <Button title={<img src='/assets/Vector (2).png'/>} width='200px' height='30px'/>
                <Button title={<img src='/assets/Vector (2).png'/>} width='200px' height='30px'/>

            </div>
            <div className={styles.inputComment}>
                <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                <div className={styles.btnSend}>
                <Button title='Send' width='250px' height='50px'/>
                </div>
            </div>
            <div className={styles.comments}>
                <h4>Comment</h4>
            </div>
            
        </div>
        <Footer/>
    </div>
  )
}

export default detailRecipe