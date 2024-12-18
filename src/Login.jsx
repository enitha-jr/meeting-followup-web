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
        const { setUserData } = useContext(UserContext);

        const handleSubmit = async (e) => {
            e.preventDefault()
            const checkData={user,pass};
            try{
                const response = await axios.post('http://localhost:5000/users', checkData);
                const data = response.data;
                if(data){
                    setUserData(data[0]);
                    console.log(data);
                    navigate('/')
                }else{
                    alert('Invalid Username or Password')
                }
            }catch{
                console.error('Error logging in:', error);
                alert('An error occurred. Please try again later.');
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