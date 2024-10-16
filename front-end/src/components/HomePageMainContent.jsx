import Header from "./Header"
import MyBond from "./MyBond"
import YourAdmirer from "./YourAdmirer"
import myPic from '../assets/myPic.png'
import users from "../sampleDataBase/users"
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';


export default function HomePageMainContent() {

    const [username, setUsername] = useState('');
    const [expiry, setExpiry] = useState('');
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
                const expirationDate = new Date(decodedToken.exp * 1000); // Convert from seconds to milliseconds
                setExpiry(`Token expires at (Date):, ${expirationDate}`);
            } catch (err) {
                console.error('Invalid token');
                navigate('/login');
            }
        } else {
            // If no token is found, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    console.log("Hiiiii", localStorage.getItem('token'));

    const newUserCap = username.charAt(0).toUpperCase() + username.slice(1);

    const axiosFetch = useAxiosFetch();
    const [myBonds, setmyBonds] = useState([]);
    useEffect(() => {
        const fetchMyBonds = async () => {
            const response = await axiosFetch.get(`/users/${username}/myBonds`)
            console.log(response.data)
            setmyBonds(response.data)
        }

        fetchMyBonds();
    } , [])

    const [ongoingBonds, setongoingBonds] = useState([]);
    useEffect(() => {
        const fetchOngoingBonds = async () => {
            const response = await axiosFetch.get(`/users/${username}/ongoingBonds`)
            console.log(response.data)
            setongoingBonds(response.data)
        }

        fetchOngoingBonds();
    } , [])



    const BondElements = myBonds.map(highlight => {
        return (
            <MyBond 
                key={highlight.name}
                img={highlight.img}
                name={highlight.name}
            />
        )  
    })


    const YourAdorerElements = ongoingBonds.map(item => {
        return (
            <YourAdmirer
                key={item.bgImg}
                bgImg={item.bgImg}
                artistImg={item.artistImg}
                name={item.name}
                status={item.status}
            />
        )
    })

    // const uniqueId = '123';
    const user = {dave: {bondId: 'dave'},
                  ojims: {bondId: 'ojims'}};


    return (
        <>
        <div style={{ color:'white', width: '80%', marginTop:0, float:'left' }}> 
                  
                  <Header/>
                  <h4 style={{textAlign: 'left', paddingLeft:20, whiteSpace: 'nowrap'}}>My Bonds</h4>

                  <div style={{ marginLeft: 20, display: 'flex', justifyContent: 'flex-start'}}>
                        <Link to="/formabond" style={{textDecoration:"none"}}>
                            <div style={{cursor: 'pointer'}}>
                                <div style={{ display: 'flex'}}>
                                    <img src={myPic} style={{height: 68, width: 76, borderTopLeftRadius: 50, borderBottomRightRadius: 50, border: '4px solid transparent'}}/>
                                </div>
                                <p style={{fontSize: 16, display: 'inline', whiteSpace: 'nowrap'}}>{newUserCap}, form a bond</p>
                            </div>
                        </Link>

                        

                        <div style={{overflowX:'auto', display: 'flex', scrollbarWidth: 'thin'}}>
                             
                              {BondElements}
                              
                        </div> 
                  </div>
                  

                  <h5 style={{textAlign:'left', paddingLeft:40, whiteSpace: 'nowrap'}}>Your Adorers</h5>

              <div style={{ overflowY:'auto', display:'flow', height:220, marginLeft:15, justifyContent:'center'}}>

               <Link 
               to={`/activedate?bondId=${user.dave.bondId}`}>
               <h1>Dave</h1>
               </Link> 

               <Link 
               to={`/activedate?bondId=${user.ojims.bondId}`}>
               <h1>Ojims</h1>
               </Link> 
              

                  
                    {YourAdorerElements}
                  
              </div>

        </div>
        </>
    )
}