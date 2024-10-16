import { faBlackboard } from '@fortawesome/free-solid-svg-icons'
import BondPageMainContent from '../components/BondPageMainContent'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'



export default function ActiveBondPage() {
  return (
    <> 
      <center >
            <div class="activeDate" style={{display: 'flex', justifyContent: 'flex-end', width: '50%', minWidth:300, height:'100%', borderRadius: 40}}>

              <BondPageMainContent/>
               
               <SideBar/>

            </div>
            <Footer/>
            
            
      </center> 
      
    </>
  )
}
