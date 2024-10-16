import Header from "./Header"
import bondsLogo from '../assets/bonds_white.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import {jwtDecode} from 'jwt-decode';

export default function UploadNFTPageMainContent() {
    const [username, setUsername] = useState('');
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [coverArt, setCoverArt] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
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

    const handleCoverArtChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverArt(reader.result); // This will be a base64 encoded string
        };
        reader.readAsDataURL(file);
    };
    
    const handleAudioFileChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('audioFile', audioFile);
        formData.append('songName', songName);
        formData.append('artistName', artistName);
        formData.append('coverArt', coverArt);
    
        try {
          const response = await axios.post(`http://localhost:5000/new-ownedAsset/${signedInUser}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert('File uploaded successfully');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
    };


    return (
        <>
            <div style={{ color:'white', width: '80%', marginTop:0, float:'left' }}> 
                    
                    {/* <Header/> */}
                    <div style={{display: 'flex', marginTop:20}}>
                        <Link to={"/options"} style={{textDecoration: 'none'}}>
                            <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                        </Link>
                        <p style={{width: '90%'}}><b>Upload Music</b></p>
                    </div>
                    

                    
                    
                    

                    
                     
                    <div style={{marginTop:10, whiteSpace: 'wrap'}}>
                        <br/>
                        
                        <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Song Name"
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            style={{width: 214, height: 17, fontSize: 12}}
                            required
                        />
                        <br/>

                        <input
                            type="text"
                            placeholder="Artist Name"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            style={{width: 214, height: 17, fontSize: 12}}
                            required
                        />

                        <br/>
                        <p style={{fontSize:16}}>Upload Song Cover Image:</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverArtChange}
                            style={{backgroundColor:'black', width: 214, color: 'white'}}
                            required
                        />


                        <br/>
                        <p style={{fontSize:16}}>Upload Full Song:</p>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioFileChange}
                            style={{backgroundColor:'black', width: 214, color: 'white'}}
                            required
                        />
                        <button type="submit" style={{whiteSpace: 'nowrap', backgroundColor: 'white', color: 'black', paddingTop: 6, paddingBottom: 6, paddingLeft: 66, paddingRight: 66}}>Upload Song</button>
                        </form>
                        
                    </div>

                    
                    

            </div>          
        </>          
    )
}