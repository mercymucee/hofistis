import React from 'react'
import { Link } from 'react-router-dom'

import { useState } from 'react';  
import axios from "axios";

const SignUp = () => {

  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[phone,setPhone]=useState("")
  const[password,setPassword]=useState("")
  const[success,setSuccess]=useState("")
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")


  const submit=async(e)=>{
    
    e.preventDefault()
    setLoading("please wait as we upload your data")
  

  try {
    const data=new FormData()

    data.append("username",username)
    data.append("email",email)
    data.append("phone",phone)
    data.append("password",password)


    const response =await axios.post("https://mercymucee.pythonanywhere.com/api/signup",data)
    console.log (response)

    setLoading("")

    setSuccess(response.data.Success)

  } catch (error) {
    setLoading("")
    setError(error.message)

  }
}
  return (
    <div className='row justify-content-center mt-4'>

      <div className='col-md-6 p-4 card shadow'>
        {/* <h1>Welcome to SignUp page</h1> */}

        <h2>sign up</h2>

        <p className='text-warning'>{loading}</p>
        <p className='text-success'>{success}</p>
        <p className='text-error'>{error}</p>
        <form action="" onSubmit={submit}>
          <input type="text" placeholder='enter username'className='form-control'required onChange={(e)=>setUsername(e.target.value)} value={username}/> {username}
          <br />
          <br />
          <input type="email" placeholder='enter email'className='form-control'required onChange={(e)=>setEmail(e.target.value)} value={email}/>
          <br />
          <br />
          <input type="number" placeholder='enter phone'className='form-control'required onChange={(e)=>setPhone(e.target.value)} value={phone}/>
          <br />
          <br />
          <input type="password" placeholder='enter password'className='form-control'required onChange={(e)=>setPassword(e.target.value)} value={password}/>
          <br />
          <br />

          <button className='btn btn-primary'>Sign up</button>
            




        </form>

        Already have an account<Link to="/signin">Signin</Link>
        </div>
    </div>
  )
}

export default SignUp