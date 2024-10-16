import { Link } from 'react-router-dom'
import musicPic from '../assets/lsd.jpg'
import myPic from '../assets/myPic.png'
import taller from '../assets/taller.png'
import bluesea from '../assets/bluesea.png'
import ojiims from '../assets/ojiims.jpg'
import video from '../assets/ojiims.mp4'
import audio from '../assets/flatline.mp3';
import {jwtDecode} from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng";
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to the Node.js server

export default function DatePageMainContent() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const bondId = new URLSearchParams(location.search).get('bondId')

    const [loopCount, setLoopCount] = useState(0);
    const [musicProgress, setMusicProgress] = useState(0);
    const [musicDuration, setMusicDuration] = useState(0); // To store the actual music duration
    const audioRef = useRef(null);

    // useEffect(() => {
    //     // Get the token from localStorage
    //     const uid = localStorage.getItem('token');
        
    //     if (uid) {
    //         try {
    //             // Decode the token to get the user information
    //             const decodedToken = jwtDecode(uid);
    //             setUsername(decodedToken.username);

    //             // Convert the expiration timestamp to a human-readable date
    //         } catch (err) {
    //             console.error('Invalid token');
    //         }
    //     } else {
    //         // If no token is found, redirect to login
    //         navigate('/home');
    //     }
    // }, [navigate]);

    useEffect(() => {
        
    const APP_ID = "ec25ce97bff34518acf16768af88b377"

    // const uid = localStorage.getItem('token');
    // const decodedToken = jwtDecode(uid);
    // setUsername(decodedToken.username);

    let uid = sessionStorage.getItem('uid')
    if(!uid) {
        uid = String(Math.floor(Math.random() * 10000))
        sessionStorage.setItem('uid', uid)
    }

    let token = null;
    let client;

    const queryString = window.location.search;
    console.log("Heyyy", queryString); // Logs the query string if present
    const urlParams = new URLSearchParams(queryString)

    let roomId = urlParams.get('room')

    if(!roomId) {
        roomId = 'main'
    }

    let localTracks = []
    let remoteUsers = {}



    const displayFrame = document.getElementById('stream__box');
    console.log("Hello", displayFrame);

    if (!displayFrame) {
        console.error("Element with id 'stream__box' not found.");
        return;
    }

    const videoFrames = document.getElementsByClassName('encapsulator');
    let userIdInDisplayFrame = null;

    const expandVideoFrame = (e) => {
        let child = displayFrame.children[0]
        if (child) {
        document.getElementById('streams__container').appendChild(child);
        }

        displayFrame.style.display = 'block';
        displayFrame.appendChild(e.currentTarget);
        userIdInDisplayFrame = e.currentTarget.id;

        for (let i = 0; i < videoFrames.length; i++) {
        if (videoFrames[i].id !== userIdInDisplayFrame) {
            videoFrames[i].style.height = '50px';
            videoFrames[i].style.width = '50px';
        }
        }
    };

    let joinStream = async () => {
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks({}, {encoderConfig:{
            width:{min:640, ideal:1920, max:1920},
            height:{min:480, ideal:1080, max:1080}
        }})

        let player = `<div class="encapsulator">
                        <div class="video__container" id="user-container-${uid}">
                            <div class="video-player" id="user-${uid}"><div>
                        </div>
                        <p>${uid}</p>
                    </div>`

        console.log('ZXSello',uid)            

        document.getElementById('streams__container').insertAdjacentHTML('beforeend', player) 
        document.getElementById(`user-container-${uid}`).addEventListener('click', expandVideoFrame)

        
        localTracks[1].play(`user-${uid}`)
        await client.publish([localTracks[0], localTracks[1]])

    }

    let handleUserPublished = async (user, mediaType) => {
        remoteUsers[user.uid] = user

        await client.subscribe(user, mediaType)

        let player = document.getElementById(`user-container-${user.uid}`)

        if(player === null) {
            player = `<div class="video__container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"><div>
                    </div>`

            document.getElementById('streams__container').insertAdjacentHTML('beforeend', player)
            document.getElementById(`user-container-${user.uid}`).addEventListener('click', expandVideoFrame)
        }

        if(displayFrame.style.display) {
            let videoFrame = document.getElementById(`user-container-${user.uid}`)
            videoFrame.style.height = '50px'
            videoFrame.style.width = '50px'
        }

        if (mediaType === 'video') {
            user.videoTrack.play(`user-${user.uid}`)

        }

        if (mediaType === 'audio') {
            user.audioTrack.play(`user-${user.uid}`)

        }
    }


    let handleUserLeft = async (user) => {
        delete remoteUsers[user.uid]
        let item = document.getElementById(`user-container-${user.uid}`)
        if (item) {
            item.remove()
        }

        if(userIdInDisplayFrame === `user-container-${user.uid}`) {
            displayFrame.style.display = null

            let videoFrames = document.getElementsByClassName('encapsulator')

            for(let i = 0; videoFrames.length > i; i++) {
                videoFrames[i].style.height = '50px'
                videoFrames[i].style.width = '50px'
            }
        }

    }

    let joinRoomInit = async () => {
        client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
        await client.join(APP_ID, bondId, token, uid)

        client.on('user-published', handleUserPublished)
        client.on('user-left', handleUserLeft)

        joinStream()

    }

    let toggleMic = async (e) => {
        let button = e.currentTarget

        if(localTracks[0].muted) {
            await localTracks[0].setMuted(false)
            button.classList.add('active')
        }else {
            await localTracks[0].setMuted(true)
            button.classList.remove('active')
        }
    } 



    let toggleCamera = async (e) => {
        let button = e.currentTarget

        if(localTracks[1].muted) {
            await localTracks[1].setMuted(false)
            button.classList.add('active')
        }else {
            await localTracks[1].setMuted(true)
            button.classList.remove('active')
        }
    } 

    let leaveStream = async (e) => {
        
        navigate('/home');
        for(let i = 0; localTracks.length > i; i++) {
            localTracks[i].stop()
            localTracks[i].close()
        }

        await client.unpublish([localTracks[0], localTracks[1]])

        document.getElementById(`user-container-${uid}`).remove()

        if(userIdInDisplayFrame === `user-container-${uid}`) {
            displayFrame.style.display = null

            for(let i = 0; videoFrames.length > i; i++) {
                videoFrames[i].style.height = '50px'
                videoFrames[i].style.width = '50px'
            } 

        }

    }

    document.getElementById('camera-btn').addEventListener('click', toggleCamera)
    document.getElementById('mic-btn').addEventListener('click', toggleMic)
    document.getElementById('leave-btn').addEventListener('click', leaveStream)


    joinRoomInit()
    


    for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].addEventListener('click', expandVideoFrame)
    }

    }, []);


    useEffect(() => {
        // Listen for music status from server
        socket.on('musicStatus', ({ loopCount, timeInCurrentLoop }) => {
            setLoopCount(loopCount);
            setMusicProgress(timeInCurrentLoop);

            // Adjust audio to the current progress
            if (audioRef.current && musicDuration > 0) {
            // Ensure audio duration is known before setting the currentTime
            audioRef.current.currentTime = timeInCurrentLoop / 1000; // Convert ms to seconds
            if (audioRef.current.paused) {
                audioRef.current.play();
            }
            }
        });

        return () => {
            socket.off('musicStatus');
        };
    }, [musicDuration]); // Re-run effect when the music duration is updated


    // Once the audio metadata is loaded, send the music duration to the server
    const handleAudioLoadedMetadata = () => {
        if (audioRef.current) {
            const duration = audioRef.current.duration * 1000; // Convert seconds to milliseconds
            setMusicDuration(duration); // Store it locally
            socket.emit('setMusicDuration', duration); // Inform the server of the music duration
        }
    };



    return (
        <>
        <div style={{ color:'white', height:'610px',  width: '100%', marginTop:12, float:'left' }}> 
            <div id="nav">
                <button id="camera-btn" class="active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z"/></svg>
                </button>
                <button id="mic-btn" class="active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"/></svg>
                </button>
            </div>
            <div style={{display: 'flex', marginTop:1}}>
                <Link to={"/home"} id="leave-btn" style={{textDecoration: 'none'}}>
                    <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                </Link>
                <p style={{width: '100%', fontSize: 12, lineHeight: 2, marginRight:40}}>You've pulsed {loopCount}/20 times, 15 more to go!<br/><marquee><b>TOMI OBANURE - FLATLINE</b></marquee></p>
            </div>
                  
                  
              <div>

                  <div className="activeDateFrame" style={{  width: '90%', height: 410, border: '3px solid yellow', borderRadius:14}}>
                        
                            
                            <main class="container">
                                
                                    <div id="room__container">
                                        
                                        
                                        <section id="stream__container">
                                        

                                            <div id="stream__box"></div>

                                            {/* <audio autoplay="autoplay" loop src={audio}>
                                            </audio> */}

                                            {/* <audio 
                                                ref={audioRef} 
                                                loop 
                                                onLoadedMetadata={handleAudioLoadedMetadata}
                                            >
                                                <source src={audio} type="audio/mp3" />
                                                
                                            </audio> */}
                                            

                                            <div id="streams__container">
                                            
                                           
                                                <div class="encapsulator">
                                                    <div class="video__container" id="user-container-1">
                                                        <img src={ojiims} className="date-profile-icons"/>
                                                    </div>
                                                    <p style={{fontSize:12}}>Ojims</p>
                                                </div>

                                                <div class="encapsulator">
                                                    <div class="video__container" id="user-container-1">
                                                        <img src={bluesea} className="date-profile-icons"/>
                                                    </div>
                                                    <p style={{fontSize:12}}>Bluesea_ASBM</p>
                                                </div>
                                           
                                            


                                                

                                            </div>
                                            
                                        </section>

                                        
                                    </div>
                            </main>
                  </div>
              </div>
        </div>
        </>
    )
}