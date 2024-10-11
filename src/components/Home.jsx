import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  // console.log(products);


  const {search,pathname} = useLocation()
  // console.log(search)

  //this not updating so using usestate let filterProduct = products && products
  const [filterProduct,setFilterProduct] = useState(null)


  const category = decodeURIComponent(search.split("=")[1])

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilterProduct(data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (!filterProduct || category=="undefined") { setFilterProduct(products); }
    if (category != "undefined") {
      // getProductCategory();
      setFilterProduct(products.filter(p=>p.category == category))
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
    
      {(pathname != "/" || search.length >0) && (<Link to="/" className="mr-5 py-2 px-5 border border-blue-200 text-blue-300 rounded  absolute left-[17%] top-[3%]" >Home</Link>)}

      <div className="h-full w-[85%] p-5  pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto ">
        {filterProduct && filterProduct.map((p, i) => (
          <Link
            key={i}
            to={`/details/${p.id}`}
            className="mr-3 mb-3 card w-[18%] h-[30vh]  p-3 border shadow rounded flex flex-col justify-center items-center"
          >
            <div
              className="w-full h-[80%] hover:scale-110 mb-3 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${p.image})`,
              }}
            ></div>
            <h1 className="text-sm font-bold hover:text-emerald-600">
              {p.title}
            </h1>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
