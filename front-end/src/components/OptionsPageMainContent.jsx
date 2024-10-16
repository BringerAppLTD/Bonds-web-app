import Header from "./Header"
import OwnedNFT from "./OwnedNFT"
import Swap from "./Swap"
import bondsBlack from '../assets/bonds_black.png'
import { Link } from 'react-router-dom'
import ownedAssets from "../sampleDataBase/ownedAssets"
import swaps from "../sampleDataBase/swaps"

export default function OptionsPageMainContent() {
    const OwnedNFTElements = ownedAssets.map(nft => {
        return <OwnedNFT 
                  songTitle={nft.songTitle}
                  bgImg={nft.bgImg}
                />
    })

    const SwapElements = swaps.map(swap => {
        return <Swap 
                  artistImg={swap.artistImg}
                  bgImg={swap.bgImg}
                  name={swap.name}
                  timeRemaining={swap.timeRemaining}
                />
    })

    
    return (
        <>
        <div style={{ color:'white', width: '80%', marginTop:0, float:'left' }}> 
                  
                  <Header/>
                  <h4 style={{textAlign: 'left', paddingLeft:20, whiteSpace: 'nowrap'}}>Owned <span style={{color:'yellowgreen'}}>Assets(1)</span></h4>
                  {/* <hr style={{width: 70, float: 'left', marginLeft: 25}}/> */}
                  

                  <div style={{ marginLeft: 25, display: 'flex', justifyContent: 'flex-start', paddingBottom:10}}>

                        <Link to="/uploadAsset" style={{textDecoration: 'none'}}>
                            <div style={{cursor: 'pointer'}}>
                                
                                <div style={{ display: 'flex'}}>
                                    <img src={bondsBlack} style={{height: 68, width: 76, borderTopLeftRadius: 50, borderBottomRightRadius: 50, border: '4px solid limegreen'}}/>
                                </div>
                                <p style={{fontSize: 16, display: 'inline', whiteSpace: 'nowrap'}}>Upload Music</p>
                            </div>
                        </Link>
                      
                      <div style={{overflowX:'auto', display: 'flex', scrollbarWidth: 'thin'}}>

                      {OwnedNFTElements}
    
                      </div>
                        
                  </div>

                  <div style={{lineHeight: 0.1}}> 
                    <h5 style={{textAlign:'left', paddingLeft:25, whiteSpace: 'nowrap'}}>All swaps</h5>
                    <h5 style={{textAlign:'left', paddingLeft:25, whiteSpace: 'nowrap'}}><i>(From the genres you love)</i></h5>
                  </div>
                  

                  <div style={{ overflowY:'auto', display:'flow', height:220, marginLeft:15 }}>
                        {SwapElements} 

                  </div>

                  
        </div>
        </>
    )
}