import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

const Nav = () => {

  const [products] = useContext(ProductContext);

  let distinctCatrgory = products && products.reduce((acc,cval)=>[...acc,cval.category],[])
  distinctCatrgory = [...new Set(distinctCatrgory)]
  // console.log(distinctCatrgory)

  const color =() =>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
  }


  return (
    <>  
    <nav className="w-[15%] h-full  bg-slate-600 flex flex-col  items-center pt-5">
        <a
          className="py-3 px-5 border border-neutral-900 rounded "
          href="/create"
        >
          {" "}
          Add New Product
        </a>
        <hr className="my-3 w-[80%]" />
        <h1 className="text-2xl w-[80%] mb-3 ">Category</h1>
        <div className="w-[80%] ">
          
          {distinctCatrgory.map((c,i)=>(
            <Link key={i} to={`/?category=${c}`} className="mb-3 flex items-center ">
            
            <span style={{backgroundColor: color()}} className="rounded-full mr-2 w-[15px] h-[15px] bg-blue-100 "></span>
            {c}
          </Link>
          ))}
          
        </div>
      </nav>
    
        </>
  )
}

export default Nav