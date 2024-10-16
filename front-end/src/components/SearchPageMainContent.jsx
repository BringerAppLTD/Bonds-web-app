import Header from "./Header"
import FormABond from "./FormABond"
import ownedAssets from "../sampleDataBase/ownedAssets"
import { Link } from "react-router-dom"
import profilePic from '../assets/profile.png'
import ojiims from '../assets/ojiims.jpg'
import yourPic from '../assets/myPic.jpg'
import jimmy from '../assets/jimmy.jpg'
import ebong from '../assets/ebong.jpg'
import jjj from '../assets/jjj.jpg'
import iniemem from '../assets/iniemem.jpg'
import formABondBgPic from '../assets/eyhit.jpeg'

export default function SearchPageMainContent() {
      const FormABondElements = ownedAssets.map(music => {
      return <FormABond 
                  bgImg={music.bgImg}
                  profileImg={music.profileImg}
                  artistName={music.artistName}
                  songTitle={music.songTitle}
                  username={music.username}
            />
      })
    return (
        <>
        <div style={{ color:'white',  width: '80%', marginTop:0, float:'left' }}> 
                  
                  {/* <Header/> */}
                  <div style={{display: 'flex', marginTop:20}}>
                        <Link to={"/home"} style={{textDecoration: 'none'}}>
                            <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                        </Link>
                        <div style={{width: '80%', marginTop: 2}}>
                            <p><b>Search Bonds</b></p>
                        </div>
                    </div>


                    <div style={{overflowY:'auto', lineHeight:0.1, paddingTop:36, paddingBottom:30}}>
                        <input type="text" placeholder="search with name of song or name of artist or bonds username" style={{width: 350, height: 20, fontSize:12, padding: 6, border: '1px solid yellow'}}/>
                    </div>


            <div style={{ overflowY:'auto', display:'flow', height:400 }}>
                  <div className="formABond-Item-Container">
                        
                  {FormABondElements}
                        
                  </div>
            </div>      
        </div>
        </>
    )
}