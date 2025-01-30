    // import React from 'react'
    // import { useNavigate } from 'react-router-dom'
    // import './styles/login.css'
    // import { useState,useEffect } from 'react'
    // import login from "./assets/icons/loginillustration.png"
    // import axios from 'axios'
    // import { useContext } from 'react'
    // import { UserContext } from './UserContext'


    // const Login = () => {
    //     const navigate = useNavigate()
    //     const [user, setUser] = useState('')
    //     const [pass,setPass] = useState('')
    //     const { setUserData } = useContext(UserContext);

    //     const handleSubmit = async (e) => {
    //         e.preventDefault()
    //         const checkData={user,pass};
    //         try{
    //             const response = await axios.post('http://localhost:5000/users', checkData);
    //             const data = response.data;
    //             if(data){
    //                 setUserData(data[0]);
    //                 console.log(data);
    //                 navigate('/')
    //             }else{
    //                 alert('Invalid Username or Password')
    //             }
    //         }catch{
    //             console.error('Error logging in:', error);
    //             alert('An error occurred. Please try again later.');
    //         }
    //     }
    //     return (
    //         <div className="content">
    //             <div className="loginimgdiv"><img className="loginimg" src={login} alt=""/></div>
    //             <div className="login-container">
    //                 <div className="login-head">
    //                     Login
    //                 </div>
    //                 <form className="login-form" onSubmit={handleSubmit}>
    //                     <div><input type="text" placeholder="username" onChange={e=>setUser(e.target.value)} required/></div>
    //                     <div><input type="password" placeholder="Password" onChange={e=> setPass(e.target.value)} required/></div>
    //                     <div className="submit-div">
    //                         <button>Sign in</button>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     )
    // }

    // export default Login

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate ,useLocation} from 'react-router-dom';
import './styles/login.css';
import login from "./assets/icons/loginillustration.png";
import axios from 'axios';
import { UserContext } from './UserContext';
import host from './assets/icons/host.png';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const { setUserData, userData } = useContext(UserContext);

    const location = useLocation();
    const nouser = location.state?.nouser || false;
    console.log(nouser) 
    // Google Client ID
    const clientId = "17992968099-bg7q3k8s23iphc611hn6aiv23e6rpcqq.apps.googleusercontent.com";

    // Load Google Identity Services Script
    useEffect(() => {
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.onload = () => initializeGoogleSignIn();
            document.body.appendChild(script);
        };
        loadGoogleScript();
    }, []);

    const initializeGoogleSignIn = () => {
        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleSignIn,
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large" }
        );
    };

    const handleGoogleSignIn = async (response) => {
        try {
            // Send the token to your server for verification and user info
            const result = await axios.post('http://localhost:5000/users/google-login', {
                token: response.credential,
            });
            const data = result.data;
            console.log(data);

            if (data) {
                setUserData(data);
                navigate('/');
            } else {
                alert('Google Sign-In failed. Please try again.');
            }
        } catch (error) {
            console.error('Google Sign-In error:', error);
            alert('An error occurred during Google Sign-In.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const checkData = { user, pass };
        try {
            const response = await axios.post('http://localhost:5000/users', checkData);
            const data = response.data;

            if (data) {
                setUserData(data[0]);
                console.log(userData);
                navigate('/');
            } else {
                alert('Invalid Username or Password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="content">
            {nouser && <div className="error-message">You have to log in first.</div>}
            <div className="loginimgdiv">
                <img width={600} className="loginimg" src={host} alt="" />
            </div>
            <div className="login-container">
                <div className="login-head">
                    Login
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div><input type="text" placeholder="username" onChange={e => setUser(e.target.value)} required /></div>
                    <div><input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} required /></div>
                    <div className="submit-div">
                        <button>Sign in</button>
                    </div>
                </form>
                <div id="googleSignInDiv" className='google-sign-in'></div>
                <div className='register-div'>
                    dont have an account ? 
                    <Link to="/register"><span>register</span></Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
