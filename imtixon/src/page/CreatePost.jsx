import '../App.scss'
import { useState, useEffect } from 'react'
import {toast} from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { istance } from '../API';

const CreatePost = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, settitle] = useState("");
  const [image, setimg] = useState("");
  const [description, setarea] = useState("");

  const hendleCreatProduct = (e) => {
    e.preventDefault();
    istance.post("/api/posts/",
     {
        title : title,
        image : image,
        description : description,
        category: categories
      })
      .then(response => {
        if(response.status === 201){
          toast.success('You registered succesfully');
          console.log(response);
        }
      })
      .catch(error => {
       console.log(error);
       toast.error(error.response.data.errors[0].msg)
      })
  }

  
  useEffect(() => {
    const fetchDataCAtegory = async () =>{
      try{
        // setLoading(true)
        const response = await istance("/api/categories");
        setCategories(response.data.data);
        // setLoading(false)
      }
      catch(error){
        toast.error("Error")
      }
    }

    fetchDataCAtegory();
  }, [])
  console.log(categories);

  return (
    <>
     <div className='create_container'>
      <h2 className='create_h2'>Create New Post</h2>
        <span className='create_span'></span>
          <ul className='create_list'>
              <form onSubmit={hendleCreatProduct}>
              <li className='create_iytem'>
               <h2>Post title</h2>
               <input className='create_input_title' type="text" value={title} onChange={(e) => settitle(e.target.value)} />
           </li>
           <ul className='create_list_flex'>
            <li className='create_iytem'>
              <h2>Post image</h2>
              <input type="src" value={image} onChange={(e) => setimg(e.target.value)}  />
            </li>
            <li className='create_iytem'>
              <h2></h2>
              <select  value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option>Select post category</option>

                {
                  categories.map(category => 
                  <option value={category._id} key={uuidv4()}  >{category.title} </option>  

                  )
                }
              </select>
            </li>
           </ul>
           <li className='create_iytem'>
            <h2>Post description</h2>
              <textarea name="" id="" cols="30" rows="10" value={description} onChange={(e) => setarea(e.target.value)} ></textarea>
           </li>
              <button type='submit'>Create Post</button>
              </form>
          </ul>
    </div>
    </>
  )
}

export default CreatePost