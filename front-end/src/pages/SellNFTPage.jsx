import { faBlackboard } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../components/SideBar'
import SellNFTPageMainContent from '../components/SellNFTPageMainContent'
import Footer from '../components/Footer'



export default function SellNFTPage() {
  return (
    <> 
      <center >
            <div style={{display: 'flex', justifyContent: 'flex-end', width: '50%', minWidth:300, height:'100%', backgroundColor: 'rgb(119, 63, 248)', borderRadius: 40}}>
               
               <SellNFTPageMainContent/>
               
               <SideBar/>

            </div>
            <Footer/>
            
            
      </center> 
      
    </>
  )
}
