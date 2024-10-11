import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useContext(ProductContext);
  const [edproduct, setEdproduct] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    price: "",
  });
  // const [title ,setTitle] =useState("");
  // const [image ,setImage] =useState("");
  // const [price ,setPrice] =useState("");
  // const [category ,setCategory] =useState("");
  // const [description ,setDescription] =useState("");

  const changeHandler = (e) => {
    setEdproduct({ ...edproduct, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setEdproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();
    if (
      edproduct.title.trim().length < 5 ||
      edproduct.image.trim().length < 5 ||
      edproduct.price.trim().length < 1 ||
      edproduct.category.trim().length < 5 ||
      edproduct.description.trim().length < 5
    ) {
      alert("Please fill all the fields");
      return;
    }
    // new changes here line
    const pii = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pii] = { ...products[pii], ...edproduct };
    // const productAdd = {
    //     id:nanoid(),
    //     title,image,price,category,description}
    // console.log(productAdd)
    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
    toast.success("Product Edit Successfully");
  };
  return (
    <form
      onSubmit={AddProductHandler}
      className=" p-[5%] w-screen h-screen flex flex-col  items-center"
    >
      <h1 className="text-3xl mb-5 w-1/2">Edit Product</h1>
      <Link
        to="/"
        className="mr-5 py-2 px-5 border border-blue-200 text-blue-300 rounded  absolute left-[17%] top-[3%]"
      >
        Home
      </Link>

      <input
        type="url"
        name="image"
        id=""
        placeholder="Image Link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2  mb-3"
        // onChange={(e)=>{setImage(e.target.value)}}
        onChange={changeHandler}
        value={edproduct && edproduct.image}
      />

      <input
        type="text"
        name="title"
        id=""
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2  mb-3"
        // onChange={(e)=>{setTitle(e.target.value)}}
        onChange={changeHandler}
        value={edproduct && edproduct.title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          name="category"
          id=""
          placeholder="Category"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%]  mb-3 "
          // onChange={(e)=>{setCategory(e.target.value)}}
          onChange={changeHandler}
          value={edproduct && edproduct.category}
        />

        <input
          type="number"
          name="price"
          id=""
          placeholder="Price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          // onChange={(e)=>{setPrice(e.target.value)}}
          onChange={changeHandler}
          value={edproduct && edproduct.price}
        />
      </div>
      <textarea
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2  mb-3"
        placeholder="Enter Product Description here..."
        // onChange={(e)=>{setDescription(e.target.value)}}
        onChange={changeHandler}
        value={edproduct && edproduct.description}
        name="description"
        id=""
        rows="10"
      ></textarea>
      <div className="w-1/2">
        <button className="py-2 px-5 border border-blue-200 text-blue-300 rounded">
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
