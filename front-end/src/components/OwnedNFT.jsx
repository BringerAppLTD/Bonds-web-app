import {Link} from 'react-router-dom'

export default function OwnedNFT(nft) {
    return (
        <>
        <Link to={"/ownedAsset"} style={{textDecoration: 'none'}}>
            <div style={{cursor: 'pointer'}}>
                
                <div style={{ display: 'flex', marginLeft: 40}}>
                    <img src={nft.bgImg} style={{height: 68, width: 76, borderTopLeftRadius: 50, borderBottomRightRadius: 50, border: '4px solid transparent'}}/>
                    </div>
                    <p style={{paddingLeft: 35, fontSize: 16, display: 'inline', whiteSpace: 'nowrap'}}><b>{nft.songTitle}</b></p>
            </div>
        </Link>
        </>
    )
}
    
