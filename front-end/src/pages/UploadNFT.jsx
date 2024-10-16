import { faBlackboard } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../components/SideBar'
import UploadNFTPageMainContent from '../components/UploadNFTPageMainContent'
import Footer from '../components/Footer'



export default function UploadNFTPage() {
  const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with your contract address

  return (
    <> 
      <center >
            <div style={{display: 'flex', justifyContent: 'flex-end', width: '50%', minWidth:300, height:'100%', backgroundColor: 'rgb(119, 63, 248)', borderRadius: 40}}>
               
               <UploadNFTPageMainContent contractAddress={contractAddress}/>
               
               <SideBar/>

            </div>
            <Footer/>
            
            
      </center> 
      
    </>
  )
}
