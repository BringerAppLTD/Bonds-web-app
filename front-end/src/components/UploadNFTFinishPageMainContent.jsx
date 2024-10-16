import Header from "./Header"
import bondsLogo from '../assets/bonds_white.png'
import { Link } from 'react-router-dom'

export default function UploadNFTFinishPageMainContent() {
    return (
        <>
            <div style={{ color:'white', width: '80%', marginTop:0, float:'left' }}> 
                    
                    {/* <Header/> */}
                    <div style={{display: 'flex', marginTop:20}}>
                        <Link to={"/uploadNFT"} style={{textDecoration: 'none'}}>
                            <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                        </Link>
                        <p style={{width: '80%'}}><b>Upload NFT Finish</b></p>
                    </div>
                    

                    
                    <img src={bondsLogo} style={{height: 147, width: 147, borderRadius: 12}} />
                    

                    
                     
                    <div style={{marginTop:30, whiteSpace: 'nowrap'}}>
                        <p style={{fontSize:16}}>Input Name of Producer:</p>
                        <input style={{color: 'white', backgroundColor:'black', width: 214, height: 7, fontSize: 12}} placeholder="Enter Name of Producer" type="text"/>
                        <br/>
                        <p style={{fontSize:16}}>Exclusivity Agreement:</p>
                        <div style={{height:80, whiteSpace: 'wrap'}}>
                            <p style={{fontSize:16}}>By clicking "Upload NFT" you agree that;- This music is
                                available exclusively on the Bonds platform and not anywhere else on the internet. Failure
                                to abide by this will lead to Bonds taking legal action against you.
                            </p>
                        </div>
                    </div>
                    <br/>
                     
                    <button style={{whiteSpace: 'nowrap', backgroundColor: 'white', color: 'black', paddingTop: 6, paddingBottom: 6, paddingLeft: 66, paddingRight: 66}}>Upload NFT</button>


            </div>          
        </>          
    )
}