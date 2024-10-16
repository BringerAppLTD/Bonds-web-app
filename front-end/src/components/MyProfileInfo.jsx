import React from 'react';
import { useNavigate } from "react-router-dom";

export default function MyProfileInfo(myprofileInfo) {

    const navigate = useNavigate();

    // Function to handle sign-out
    const handleSignOut = () => {
        // Remove JWT from localStorage or sessionStorage
        localStorage.removeItem('token'); // Or sessionStorage.removeItem('authToken')

        // Redirect to the login page
        navigate('/login')
    }

    return (
        <>
        <div style={{lineHeight:0.7}}>
            <button onClick={handleSignOut} style={{fontSize:16}}>Logout</button>
            <br/>
            <br/>
            <span style={{fontSize:12, padding: 6, border: '1px solid yellow'}}>{myprofileInfo.walletAddr}</span>
        </div>
        
        <div style={{lineHeight:0.1, paddingTop:19}}>
            <p style={{fontSize:16}}>Username:</p>
            <span style={{fontSize:12, padding: 6, border: '1px solid yellow'}}>{myprofileInfo.username}</span>
        </div>

        <div style={{lineHeight:0.1, paddingTop:19}}>
            <p style={{fontSize:16}}>Bio:</p>
            <span style={{fontSize:12, padding: 6, border: '1px solid yellow'}}>{myprofileInfo.bio}</span>
        </div>
        </>
    )
}