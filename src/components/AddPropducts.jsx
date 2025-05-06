import React from 'react'
 

import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


const AddProducts = () => {
  const[product_name,setProductName]=useState("")
  const[product_description,setProductDescription]=useState("")
  const[product_cost,setProductCost]=useState("")
  const[product_photo,setProductPhoto]=useState("")
  const[success,setSuccess]=useState("")
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")

  const submit=async(e)=>{
    e.preventDefault()
    setLoading("Please wait as we upload your data")

    try{
      const data=new FormData()

      data.append("product_name",product_name)
      data.append("product_description",product_description)
      data.append("product_cost",product_cost)
      data.append("product_photo",product_photo)

      const response =await axios.post("https://mercymucee.pythonanywhere.com/api/add_product",data)
      console.log(response);
      


      

    setLoading("")

    setSuccess(response.data.message)


    }
    catch (error) {
      setLoading("")
      setError(error.message)
    }




  }


    

  

  
  return (
    <div className='row justify-content-center mt-4'> 

    <div className='col-md-6 p-4 card shadow'>
0000

        {/* <h1>Welcome to AddProducts page</h1> */}
        <h2>Add products</h2>

        <nav className='m-4'>
          <Link to='/' className="btn btn-dark">GET ALL PRODUCTS</Link>
        </nav>

        <p className='text-warning'>{loading}</p>
        <p className='text-success'>{success}</p>
        <p className='text-error'>{error}</p>

        <form action="" onSubmit={submit}>
          <input type="text" placeholder='product name' className='form-control'required onChange={(e)=>setProductName(e.target.value)}/>
          <br />
          <br />
          <textarea name="" id="" className='form-control'placeholder='product Description' onChange={(e)=>setProductDescription(e.target.value)}></textarea>
          <br />
          <br />
          <input type="number" placeholder='product cost'className='form-control' required onChange={(e)=>setProductCost(e.target.value)}/>
          <br />
          <br />
          <input type="file" placeholder='product photo' className='form-control' required onChange={(e)=>setProductPhoto(e.target.files[0])} accept='image/*'/>
          <br />
          <br />
          <button type='submit' className='btn btn-primary w-100'>Add products</button>
        </form>
    </div>
    </div>
  )
}

export default AddProducts