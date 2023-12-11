import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { istance } from '../API'
import {toast} from "react-toastify";
import '../App.scss'

const product = () => {

    const {id} = useParams()
    const [product, setproduct] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
           try{
            const response = await istance(`/api/posts/${id}`);
            setproduct(response.data)
           }
           catch(error){
            console.log(error)
           }
        }

        fetchData()
    }, [])

    console.log(product);

  return (
    <>
     <div className='product_container'>
        {
          product && 
          <div key={product.id}>
            <li className='product_card'>
            <img src={product.image} alt="" />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            </li>
          </div>
        }
      </div>
    </>
  )
}

export default product