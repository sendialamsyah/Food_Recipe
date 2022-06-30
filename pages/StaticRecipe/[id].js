import React from 'react'
import axios from 'axios'

const StaticPath = ({recipes}) => {
  return (
    <div>
        <div>StaticPath</div>
        <ul>
            <li>{recipes?.title}</li>
            <li>{recipes?.ingredients}</li>
        </ul>
    </div>

  )
}
export async function getStaticPaths() {
    const { data: resData } = await axios.get(`http://localhost:4000/v1/recipe/`);
    const paths = resData.data.map((item)=>{
        return {
            params: {
                id: item.idrecipe+ ''
            }
        }
    })
    // console.log(paths)
    return {
        paths: paths,
        fallback: true // false or "blocking" // See the "fallback" section below
      };
    }
//     return {
//       paths: [
//         { params: { id: '15' } } // See the "paths" section below
//       ],
//       fallback: true // false or "blocking" // See the "fallback" section below
//     };
//   }

  export async function getStaticProps(context) {
    const id = context.params.id
    const { data: resData } = await axios.get(`http://localhost:4000/v1/recipe/${id}`);
    return {
      props: {
        recipes: resData.data,
      }, // will be passed to the page component as props
    };
  }
export default StaticPath