import React, { useContext, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import {nanoid} from 'nanoid'
import { toast } from 'react-toastify'

const Create = () => {
    const navigate = useNavigate()

    const [products,setProducts] = useContext(ProductContext);
    const [title ,setTitle] =useState("");
    const [image ,setImage] =useState("");
    const [price ,setPrice] =useState("");
    const [category ,setCategory] =useState("");
    const [description ,setDescription] =useState("");

    const AddProductHandler = (e) =>{
        e.preventDefault();
        if(title.trim().length <5 || image.trim().length    <5 || price.trim().length  <1 || category.trim().length  <5 || description.trim().length  <5 )
            {
            alert("Please fill all the fields")
            return
        }
        const productAdd = {
            id:nanoid(),
            title,image,price,category,description}
        // console.log(productAdd)
        setProducts([...products,productAdd])
        localStorage.setItem("products",JSON.stringify([...products,productAdd]))
        toast.success("Product Added Successfully")
        
        navigate("/")
    }


  return (
    <form onSubmit={AddProductHandler} className=" p-[5%] w-screen h-screen flex flex-col  items-center">
        <h1 className='text-3xl mb-5 w-1/2'>Add New Product</h1>
        <Link to="/" className="mr-5 py-2 px-5 border border-blue-200 text-blue-300 rounded  absolute left-[17%] top-[3%]" >Home</Link>

        <input type="url" name="" id="" placeholder='Image Link' className='text-1xl bg-zinc-100 rounded p-3 w-1/2  mb-3' 
        onChange={(e)=>{setImage(e.target.value)}}
        value={image}/>

        <input type="text" name="" id="" placeholder='title' className='text-1xl bg-zinc-100 rounded p-3 w-1/2  mb-3' 
        onChange={(e)=>{setTitle(e.target.value)}}
        value={title}/>
        
        <div className='w-1/2 flex justify-between'>
        <input type="text" name="" id="" placeholder='Category' className='text-1xl bg-zinc-100 rounded p-3 w-[48%]  mb-3 ' 
        onChange={(e)=>{setCategory(e.target.value)}}
        value={category}/>

        <input type="number" name="" id="" placeholder='Price' className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3' 
        onChange={(e)=>{setPrice(e.target.value)}}
        value={price}/>
        </div>
        <textarea className='text-1xl bg-zinc-100 rounded p-3 w-1/2  mb-3' placeholder='Enter Product Description here...' onChange={(e)=>{setDescription(e.target.value)}} value={description} name="" id="" rows="10"></textarea>
        <div className='w-1/2'>
            <button className="py-2 px-5 border border-blue-200 text-blue-300 rounded">Add Product</button>
        </div>

    </form>
  )
}

export default Create