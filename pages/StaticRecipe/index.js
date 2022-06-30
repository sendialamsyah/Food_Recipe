import React from "react";
import axios from "axios";
import {useRouter} from 'next/router'

const StaticRecipe = ({recipes}) => {
    const router = useRouter()
  return (
    <div>
      <div>StaticRecipe</div>
      <ul>
        {recipes.map((item) => (
          <li key={item.idrecipe} onClick={()=>router.push(`/StaticRecipe/${item.idrecipe}`)}>{item.title} - id: {item.idrecipe}</li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps(context) {
  const { data: resData } = await axios.get("http://localhost:4000/v1/recipe");
  return {
    props: {
      recipes: resData.data,
    }, // will be passed to the page component as props
  };
}
export default StaticRecipe;