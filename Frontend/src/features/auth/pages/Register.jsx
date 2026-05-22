import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from "axios"
// import "../styles/form.scss"

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function formHandler(e){
        e.preventDefault();
    }
    
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={formHandler}>
                <input 
                onInput={(e)=>{setEmail(e.target.value)}}
                type="email" 
                name="email" 
                id="email" 
                placeholder='Enter Email' />
                <input 
                onInput={(e)=>setUsername(e.target.value)}
                type="text" 
                name="username" 
                id="username" 
                placeholder='Enter Username' />
                <input 
                onInput={(e)=>setPassword(e.target.value)}
                type="password" 
                name="password" 
                id="password" 
                placeholder='Enter Password' />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register