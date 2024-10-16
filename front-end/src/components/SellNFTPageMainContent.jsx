import { Link } from "react-router-dom"


export default function SellNFTPageMainContent() {
    return (
        <>
        <div style={{ color:'white', width: '80%', marginTop:0, float:'left' }}> 
                    
                    {/* <Header/> */}
                    <div style={{display: 'flex', marginTop:20}}>
                        <Link to={"/ownedNFT"} style={{textDecoration: 'none'}}>
                            <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                        </Link>

                        <p style={{width: '80%'}}><b>Sell NFT</b></p>
                    </div>
                    

                    <div className="ownedNft-Bg-Image" style={{height: 147, width: 147, borderRadius: 12}}>
                        <p style={{textAlign:'end', fontSize:12, color: 'white', paddingRight:15, paddingTop:10}}>You</p>
                        <p style={{color: 'white'}}><b>YE : DONDA 2</b></p>
                    </div>

                    
                     
                    <div style={{ marginTop:40, whiteSpace: 'nowrap'}}>
                        <p style={{fontSize:16}}><b>Set Swap Start Price:</b></p>
                        <input style={{backgroundColor:'black', color: 'white'}} type='range'/>
                        
                        <p style={{fontSize:16}}>Swaps finish after 24 hours</p>

                    </div>

                     
                    <button style={{whiteSpace: 'nowrap', backgroundColor: 'white', color: 'black', paddingTop: 6, paddingBottom: 6, paddingLeft: 66, paddingRight: 66}}>Schedule Swap</button>


            </div>     
        </>
    )
}