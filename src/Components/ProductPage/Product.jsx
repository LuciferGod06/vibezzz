import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Product.css'
import { Link } from 'react-router-dom';
import { Select, Skeleton} from '@chakra-ui/react'

export const Product = () => {

    const [Products,setProducts] = useState([]);
    const [Price,setPrice] = useState("");
    const [filter,setFilter] = useState("");

useEffect(()=>{
    let url = `http://localhost:8080/products`;

    if(Price && filter){
        url += `?_sort=price&_order=${Price}&category=${filter}`
    }

    else if(Price){
        url += `?_sort=price&_order=${Price}`
    }
    
    else if(filter){
        url +=`?category=${filter}`
    }

    axios.get(url)
    .then((resp)=>{setProducts(resp.data)})
    .catch((err)=>{console.log(err)})

    
},[Price,filter]);

var arr = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
    <div id='Product' >
        <div className='ProductSelectorDiv' >

          <Select w={"200px"} placeholder='Price'  border={"1px solid"} onChange={(e)=>{setPrice(e.target.value)}} >
      <option value="desc">High to Low </option>
      <option value="asc">Low to High </option>
      
      </Select>
      <Select w={"200px"}  border={"1px solid"} placeholder='Filter' onChange={(e)=>{setFilter(e.target.value)}} >
      <option value="tees">Tees</option>
      <option value="Shirt">Shirts</option>
      <option value="T-Shirt">Long Sleeves</option>
    <option value="Hoodies">Hoodies</option>
      </Select>
        </div>
        <div className='ProductPageMainDiv'>
        {
            Products.length > 0 ? (    Products.map((ele,ind)=>{
                        return  <Link to={`/product/${ele.id}`} >
                        <div className='items' key={ele.id}>
                                <img src={ele.img} alt={ele.name} />
                                <p>{ele.name}</p>
                                <h5>$ {ele.price}</h5>
                                </div>
                        </Link>
                        
                    })
                
            ): <div className='Skeletondiv' >
                {
                    arr.map((ele,ind)=>{
                        return <Skeleton  key={ind} h={"500px"} w={"330px"}/>
                    })
                }
         
            
         
            </div>
            }

        </div>
            

    </div>
  )
}
