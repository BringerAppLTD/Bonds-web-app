import { faBlackboard } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../components/SideBar'
import OwnedNFTPageMainContent from '../components/OwnedNFTPageMainContent'
import Footer from '../components/Footer'



export default function OwnedNFTPage() {
  return (
    <> 
      <center >
            <div style={{display: 'flex', justifyContent: 'flex-end', width: '50%', minWidth:300, height:'100%', backgroundColor: 'rgb(119, 63, 248)', borderRadius: 40}}>
               
               <OwnedNFTPageMainContent/>
               
               <SideBar/>

            </div>
            <Footer/>
            
            
      </center> 
      
    </>
  )
}
