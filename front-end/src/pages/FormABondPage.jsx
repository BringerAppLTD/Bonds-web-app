import { faBlackboard } from '@fortawesome/free-solid-svg-icons'
import FormABondPageMainContent from '../components/FormABondPageMainContent'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'




export default function FormABondPage() {
  return (
    <> 
    <div>
      <center >
              <div style={{display: 'flex', justifyContent: 'flex-end', width: '50%', minWidth:300, height:'100%', backgroundColor: 'rgb(119, 63, 248)', borderRadius: 40}}>
                
                <FormABondPageMainContent/>
                
                <SideBar/>

              </div>
              <Footer/> 
        </center> 
    </div>
      
    </>
  )
}
