import React, { useEffect, useState } from 'react'
import './Cart.css'
import { Button, Select, Skeleton } from '@chakra-ui/react'
import { Footer } from 'Components/Footer/Footer'
import axios from 'axios'

import cart1 from '../Assest/cart1-removebg-preview.png'
import cart2 from '../Assest/cart2-removebg-preview.png'

export const Cart = () => {
  

    const [item, setItem] = useState([]);
    const [OrderNo, setOrderNo] = useState(Math.floor(Math.random() * (99999 - 10000 + 1)) + 1000);

   let itemTotal = item.reduce((prev,curr)=>{
        return prev + curr.CartQty * curr.CartPrice;
    },0);
    useEffect(() => {
        fetchcartItem();
    }, []);

    const fetchcartItem = () => {
        axios.get(`http://localhost:8080/cart`)
            .then((resp) => { setItem(resp.data) })
            .catch((err) => { console.log(err)});
           
    }

  


    const deleteItem = (id) => {
        axios.delete(`http://localhost:8080/cart/${id}`)
            .then(() => {
                fetchcartItem()
            })
            .catch((err) => { console.log(err) })
    }


   
    const Handleqty = (value, id) => {

        // setupdate(item.filter((ele)=>ele.id === id));
        var updatedItem = (item.filter((ele) => ele.id === id));
      
        axios.put(`http://localhost:8080/cart/${id}`, {
            id: id,
            CartName: updatedItem[0].CartName,
            CartImg: updatedItem[0].CartImg,
            CartPrice: updatedItem[0].CartPrice,
            CartSize: updatedItem[0].CartSize,
            CartQty: value
        }).then(fetchcartItem)
            .catch((err) => { console.error(err) });
    }

    const loadingarray = Array(item.length).fill(1);
    return (
        <div id='cart'>
            <h1 id='cartHeader' >Shopping Cart</h1>
            

            {
                item.length > 0 ? <div className='cartTopDiv'>

                <div className='cartLeftDiv'  >
                    {
                        item.length > 0 ? item.map((ele, ind) => {
                            return <div className='cartsListItems' key={ind}>
                                <div className='cartListItemImage' >
                                    <img src={ele.CartImg} alt={ele.Cartname} />
                                </div>
                                <div className='cartListItemNameandButtons' >
                                    <h1  >{ele.CartName}</h1>
                                    <p></p>
                                    <p>Size : {ele.CartSize}</p>
                                    <p>Type : Hoddie</p>
                                    <div className='cartButtons' >

                                        <Button>Add to Wishlist</Button>
                                        <Button onClick={() => { deleteItem(ele.id) }}>Remove</Button>
                                    </div>
                                </div>
                                <div className='cartQty' >
                                    <Select value={ele.CartQty} name="" id="" placeholder='Qty' border={"1px solid"} onChange={(e) => { Handleqty(e.target.value, ele.id) }} >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                    </Select></div>
                                <div className='cartAmount'>
                                    <h1 >
                                        $ {ele.CartPrice}
                                    </h1>
                                </div>
                            </div>

                        }) : loadingarray.map((ele,ind)=>{
                            return <div>
                                <Skeleton h={"100px"} />
                                </div>
                        })
                    }


                </div>
                <div className='cartRightDiv' >
                    <p>Order Summary</p>
                    <p>UV{OrderNo}</p>
                    <div className='cartListDiv' >
                        <ul className='cartunorderlist'>
                            <li>Subtotal</li>
                            <li>Shipping </li>
                            <li>Total</li>
                        </ul>
                        <ul className='cartunorderlist' >
                            <li>$ {itemTotal.toFixed(2)} </li>
                            <li>$ 40.00</li>
                            <li id='CartTotalLi' >$ {(itemTotal+40.00).toFixed(2)}</li>
                        </ul>
                    </div>
                    <Button>Checkout</Button>
                </div>
                
            </div> : <div className='NothingCartDiv'>
             <div>
                    <img src={cart2} alt="" />
             </div>
             <p>Your's cart is Empty !</p>

            </div>
            }
           <Footer />
        </div>
        
    )
}
