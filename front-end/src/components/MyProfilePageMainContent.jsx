import Header from "./Header"
import MyDate from "./MyDate"
import users from "../sampleDataBase/users"
import { Link } from "react-router-dom"
import profilePic from '../assets/profile.png'
import ojiims from '../assets/ojiims.jpg'
import yourPic from '../assets/myPic.png'
import ebong from '../assets/ebong.jpg'
import jjj from '../assets/jjj.jpg'
import iniemem from '../assets/iniemem.jpg'
import MyProfileInfo from "./MyProfileInfo"


export default function MyProfilePageMainContent() {
      const MyDateElements = users.map(date => {
      return <MyDate 
                  songPic={date.dates[0].songPic}
                  ownerPic={date.dates[0].ownerPic}
                  timeStarting={date.dates[0].timeStarting}
                  artistName={date.dates[0].artistName}
                  songTitle={date.dates[0].songTitle}
            />
      })

      const MyProfileElement = users.map(myprofileInfo => {
      return <MyProfileInfo
                  walletAddr={myprofileInfo.walletAddr}
                  username={myprofileInfo.username}
                  bio={myprofileInfo.bio}
            />
      })
    return (
        <>
        <div style={{ color:'white', width: '80%', marginTop:0, float:'left' }}> 
                  
                  <div style={{display: 'flex', marginTop:20}}>
                        <Link to={"/home"} style={{textDecoration: 'none'}}>
                            <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                        </Link>
                        <div style={{width: '80%', marginTop: 16}}>
                              <img src={yourPic} style={{width: 60, height: 60, borderRadius: 30}}/> 
                        </div>
                    </div>
                    

                    {MyProfileElement}



                    <p style={{fontSize:16, paddingTop:19}}>My Dates</p>


            <div style={{ overflowY:'auto', display:'flow', height:205 }}>
            <div className="formABond-Item-Container">

                        {MyDateElements}
                        
                  </div>

            </div>      
        </div>
        </>
    )
}