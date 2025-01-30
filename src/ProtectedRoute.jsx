import { Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
import { useContext } from 'react';

function ProtectedRoute({children,users}) {
    const navigate = useNavigate()
    const { userData } = useContext(UserContext);
    useEffect(() => {
        const userDetails = () => {
            if (userData) {
                if (!(users ? users.includes(userData.role) : true)) {
                    alert("Unauthorized User")
                    navigate(-1)
                }
            }else{
                navigate('/login',{state:{nouser : true}})
            }
        }
        userDetails()
    },[userData,navigate])
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute