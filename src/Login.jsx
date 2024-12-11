import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/login.css'
import { useState,useEffect } from 'react'
import login from "./assets/icons/loginillustration.png"
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from './UserContext'


const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [pass,setPass] = useState('')
    const [data, setData] = useState([])
    const { setUserData } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then((response) => {
            setData(response.data)

        }).catch((error) => {
            console.error('Error fetching users:', error);
        });
    })
    // console.log(data)
    const handleSubmit = (e) => {
        e.preventDefault()
        const valid = data.find((item) => item.username === user && item.password === pass);
        // console.log(valid)
        if(valid){
            setUserData(valid);
            navigate('/')
        }
        else{
            alert('Invalid Username or Password')
        }
    }            
    return (
        <div className="content">
            <div className="loginimgdiv"><img className="loginimg" src={login} alt=""/></div>
            <div className="login-container">
                <div className="login-head">
                    Login
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div><input type="text" placeholder="username" onChange={e=>setUser(e.target.value)} required/></div>
                    <div><input type="password" placeholder="Password" onChange={e=> setPass(e.target.value)} required/></div>
                    <div className="submit-div">
                        <button>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login