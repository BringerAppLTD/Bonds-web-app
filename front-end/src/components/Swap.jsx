import {Link} from 'react-router-dom'

export default function Swap(swap) {
    return (
        <>
        <div className="yourAdmirerItem" style={{marginBottom: 12, width: 460, height: 193, border: '3px solid yellow', borderRadius:14}}>
            <img src={swap.bgImg} className="dateImage"/>

            <div className="dateImageContent">
                <div style={{float: 'left', marginLeft:40, marginTop: 80}}>
                    <Link to="/ongoingswap" style={{textDecoration:"none"}}>
                    <img src={swap.artistImg} style={{ borderRadius: 40, width:80, height: 80, border: '4px solid limegreen'}}/>
                    
                    <p style={{fontSize: 17}}><b>{swap.name}</b></p>
                    </Link> 
                </div>
                
                <div style={{marginTop: 93, float:'right', marginRight:20, lineHeight: 0.1}}>
                     
                    <Link to="/ongoingswap" style={{textDecoration:"none"}}>
                    <button style={{float: 'center', fontSize: 17, borderRadius:25, paddingRight: 40, paddingLeft: 40,  cursor: 'pointer'}}><b>Partake</b></button>
                    </Link>
                    <p style={{float: 'center', fontSize: 17, paddingTop: 12}}>{swap.timeRemaining}</p>
                </div>
            </div>
        </div>
        </>
    )
}