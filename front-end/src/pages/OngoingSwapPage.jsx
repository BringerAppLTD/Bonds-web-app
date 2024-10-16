import { faBlackboard } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../components/SideBar'
import OngoingSwapPageMainContent from '../components/OngoingSwapPageMainContent'
import Footer from '../components/Footer'



export default function OngoingSwapPage() {
  return (
    <> 
      <center >
            <div style={{display: 'flex', justifyContent: 'flex-end', width: '50%', minWidth:300, height:'100%', backgroundColor: 'rgb(119, 63, 248)', borderRadius: 40}}>
               
               <OngoingSwapPageMainContent/>
               
               <SideBar/>

            </div>
            <Footer/>
            
            
      </center> 
      
    </>
  )
}
