import { Link } from 'react-router-dom'
import musicPic from '../assets/lsd.jpg'
import myPic from '../assets/myPic.png'
import taller from '../assets/taller.png'
import bluesea from '../assets/bluesea.png'
import ojiims from '../assets/ojiims.jpg'
import video from '../assets/ojiims.mp4'
import audio from '../assets/cruel.mp3'

export default function DatePageMainContent() {
    return (
        <>
        <div style={{ color:'white',  width: '80%', marginTop:12, float:'left' }}> 
            <div style={{display: 'flex', marginTop:20}}>
                <Link to={"/home"} style={{textDecoration: 'none'}}>
                    <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                </Link>
                <p style={{width: '90%', fontSize: 12, lineHeight: 2}}>Created by <b>Ojiims</b><br/><marquee><b>TYLER TURNER, GENIO BAMBINO, CRUEL SANTINO - MATILDA</b></marquee></p>
            </div>
                  
                  
              <div style={{overflowX:'auto'}}>

                  <div className="activeDateFrame" style={{  width: 530, height: 474, border: '3px solid yellow', borderRadius:14}}>
                        
                        
                          
                          
                            <div className="video-container">
                       
                                <video autoplay="autoplay" loop height="480" width="500" src={video} muted>
                                </video>

                                <audio autoplay="autoplay" loop src={audio}>
                                </audio>


                                <div className="image-container">
                                        
                                        <div title="click to move profile to enlarged pane" className="date-profile-container">
                                            <img src={myPic} style={{borderRadius: 60, border: '5px solid #ff008c'}} className="date-profile-icons"/>
                                            <p style={{fontSize:12}}>Me</p>
                                        </div>

                                        <div title="click to move profile to enlarged pane" className="date-profile-container">
                                            <img src={taller} style={{borderRadius: 60, border: '5px solid #ff008c'}} className="date-profile-icons"/>
                                            <p style={{fontSize:12}}>Nduk3</p>
                                        </div>

                                        <div title="click to move profile to enlarged pane" className="date-profile-container">
                                            <img src={ojiims} style={{borderRadius: 60, border: '5px solid rgb(119, 63, 248)'}} className="date-profile-icons"/>
                                            <p style={{fontSize:12}}>Ojiims</p>
                                        </div>
                                        
                                        <div title="click to move profile to enlarged pane" className="date-profile-container">
                                            <img src={bluesea} style={{borderRadius: 60, border: '5px solid #ff008c'}} className="date-profile-icons"/>
                                            <p style={{fontSize:12}}>Bluesea</p>
                                        </div>
                                </div> 
                            
                            </div>
                        
                  </div>
              </div>



        </div>
        </>
    )
}