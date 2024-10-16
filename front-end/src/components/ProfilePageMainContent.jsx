import Header from "./Header"
import { Link } from "react-router-dom"
import profilePic from '../assets/profile.png'
import ojiims from '../assets/ojiims.jpg'
import yourPic from '../assets/myPic.jpg'
import jimmy from '../assets/jimmy.jpg'
import ebong from '../assets/ebong.jpg'
import jjj from '../assets/jjj.jpg'
import iniemem from '../assets/iniemem.jpg'
import formABondBgPic from '../assets/eyhit.jpeg'
import ProfileInfo from "./ProfileInfo"
import users from "../sampleDataBase/users"
import Date from "./Date"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import {jwtDecode} from 'jwt-decode';

export default function ProfilePageMainContent() {
      const [username, setUsername] = useState('');
      const [adored, setAdored] = useState(false); // Assume the default is "not adored"
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      useEffect(() => {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            
            if (token) {
                  try {
                        // Decode the token to get the user information
                        const decodedToken = jwtDecode(token);
                        setUsername(decodedToken.username);

                        // Convert the expiration timestamp to a human-readable date
                  } catch (err) {
                        console.error('Invalid token');
                  }
            } else {
                  // If no token is found, redirect to login
                  navigate('/home');
            }
      }, [navigate]);

      const signedInUser = username;
      const targetUser = 'thevictorjimmy'

      // Fetch adored status when component mounts
      useEffect(() => {
            const fetchAdoredStatus = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/users/${signedInUser}/adored/${targetUser}`);
            setAdored(response.data.adored); // Set the adored state based on the response
            } catch (error) {
            console.error('Error fetching adored status', error);
            }
            };
      
            fetchAdoredStatus();
      }, [signedInUser, targetUser]);

      const handleAdoreToggle = async () => {
            setLoading(true);
            
            try {
                  const response = await axios.patch(`http://localhost:5000/users/${signedInUser}`, {
                  targetUser,
                  });
                  
                  // Check if the targetUser is in the adored list to update the button's state
                  if (response.data.adored.includes(targetUser)) {
                  setAdored(true);
                  } else {
                  setAdored(false);
                  }
            } catch (error) {
                  console.error('Error updating adore list', error);
            } finally {
                  setLoading(false); // Stop loading once the request is complete
            }
      };
      
      const DateElements = users.map(item => {
            return(
                  item.dates.map(date => {
                        return <Date 
                                    songPic={date.songPic}
                                    ownerPic={date.ownerPic}
                                    timeStarting={date.timeStarting}
                                    artistName={date.artistName}
                                    songTitle={date.songTitle}
                               />
                  })
            )  
      })


    return (
        <>
        <div style={{ color:'white', width: '80%', marginTop:0, float:'left' }}> 
                  
                  {/* <Header/> */}

                  <ProfileInfo
                        username= 'thevictorjimmy'
                        profilePhoto={jimmy}
                        location='Japan'
                        bio='Visual and Interaction Designer.' 
                  />

                  <div style={{lineHeight:0.1}}>
                        <button
                              onClick={handleAdoreToggle}
                              style={{
                              backgroundColor: loading ? '#ccc' : adored ? '#535455' : '#0e8bfd', // Temporary color change when loading
                              color: 'white',
                              padding: '10px 40px',
                              border: 'none',
                              fontSize:'17px',
                              fontWeight:'bold',
                              borderRadius: '12px',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              }}
                              disabled={loading}
                        >
                              {loading ? 'Loading...' : adored ? 'Adored' : 'Adore'}
                        </button>
                  </div>

                  <p style={{fontSize:16, paddingTop:19}}>Owned Assets <b>(6)</b></p>
                    


            <div style={{ overflowY:'auto', display:'flow', height:205 }}>
            <div className="formABond-Item-Container">
                        
                      {DateElements}
                        
                  </div>

            </div>      
        </div>
        </>
    )
}