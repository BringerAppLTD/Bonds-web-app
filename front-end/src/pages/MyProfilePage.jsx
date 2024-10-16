import { faBlackboard } from '@fortawesome/free-solid-svg-icons'
import MyProfilePageMainContent from '../components/MyProfilePageMainContent'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'




export default function MyProfilePage() {
  return (
    <> 
    <div>
      <center >
              <div style={{display: 'flex', justifyContent: 'flex-end', width: '50%', minWidth:300, height:'100%', backgroundColor: 'rgb(119, 63, 248)', borderRadius: 40}}>
                
                <MyProfilePageMainContent/>
                
                <SideBar/>

              </div>
              <Footer/> 
        </center> 
    </div>
      
    </>
  )
}