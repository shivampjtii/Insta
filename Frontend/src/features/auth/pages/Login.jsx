import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin, loading} = useAuth();
    const navigate = useNavigate();

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    async function formHandler(e){
        e.preventDefault();
        const response = await handleLogin(username, password);
        navigate("/");
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={formHandler}>
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
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login