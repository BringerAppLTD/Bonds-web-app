import Header from "./Header"
import dune from '../assets/dune.png'
import { Link } from 'react-router-dom'

export default function OwnedNFTPageMainContent() {
    return (
        <>
            <div style={{ color:'white', width: '80%', marginTop:0, float:'left' }}> 
                    
                    {/* <Header/> */}
                    <div style={{display: 'flex', marginTop:20}}>
                        <Link to={"/options"} style={{textDecoration: 'none'}}>
                            <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                        </Link>
                        <p style={{width: '80%'}}><b>Owned Music</b></p>
                    </div>
                    

                    <div className="ownedNft-Bg-Image" style={{height: 147, width: 147, borderRadius: 12}}>
                        <p style={{textAlign:'end', fontSize:12, color: 'white', paddingRight:15, paddingTop:10}}>You</p>
                        <p style={{color: 'white'}}><b>YE : DONDA 2</b></p>
                    </div>

                    <Link to={"/sellNFT"} style={{textDecoration: 'none'}}>
                    <button style={{cursor: 'pointer', backgroundColor: 'black', color: 'white', paddingTop: 12, paddingBottom: 12, paddingLeft: 33, paddingRight: 33}}>Sell Album</button>
                    </Link>
                     

                     
                    <button style={{cursor: 'pointer', backgroundColor: 'black', color: 'white', paddingTop: 12, paddingBottom: 12, paddingLeft: 33, paddingRight: 33}}>Form a Bond</button>


            </div>          
        </>          
    )
}