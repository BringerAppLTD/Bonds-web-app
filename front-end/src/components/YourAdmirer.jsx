import {Link} from 'react-router-dom'

export default function YourAdmirer(date) {
    return (
        <>
        <div className="yourAdmirerItem" style={{marginBottom: 12, width: 460, height: 193, border: '3px solid yellow', borderRadius:14}}>
            <img src={date.bgImg} className="dateImage"/>

            <div className="dateImageContent">
                <div style={{float: 'left', marginLeft:40, marginTop: 33}}>
                    <Link to="/activedate" style={{textDecoration:"none"}}>
                    <img src={date.artistImg} style={{ borderRadius: 40, width:80, height: 80, border: '4px solid limegreen'}}/>
                    <p style={{fontSize: 17}}><b>{date.name}</b></p> 
                    </Link>
                </div>
                
                <div style={{marginTop: 53, float:'right', marginRight:20, }}> 
                    <Link to="/activedate" style={{textDecoration:"none"}}>
                    <button style={{float: 'center', fontSize: 17, borderRadius:25, paddingRight: 40, paddingLeft: 40,  cursor: 'pointer'}}><b>{date.status === "Ongoing" ? "Join" : date.status === "Finished" ? "Watch Bond" : date.status === "Not Yet Started" && "JOIN & WAIT"}</b></button>
                    </Link>
                    <p style={{float: 'center', fontSize: 17}}><span style={{color: date.status === "Ongoing" ? 'limegreen' : date.status === "Finished" ? 'red' : date.status === "Not Yet Started" && 'yellow' , fontSize: 20}}>• </span> {date.status}</p>
                </div>
            </div>
        </div>
        </>
    )
}