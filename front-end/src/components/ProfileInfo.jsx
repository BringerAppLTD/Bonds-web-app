import { Link } from "react-router-dom"

export default function ProfileInfo(profileInfo) {
    return (
        <>
        <div style={{display: 'flex', marginTop:20}}>
            <Link to={"/formabond"} style={{textDecoration: 'none'}}>
                <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
            </Link>
            <div style={{width: '80%', marginTop: 16}}>
                    <p style={{fontSize:16}}><b>{profileInfo.username}</b></p>
                    <img src={profileInfo.profilePhoto} style={{width: 60, height: 60, borderRadius: 30}}/> 
            </div>
        </div>
        
        <div style={{lineHeight:0.1, paddingTop:19}}>
            <p style={{fontSize:16}}><b>{profileInfo.location}</b></p>
            <p style={{fontSize:16}}>{profileInfo.bio}</p>
    
        </div>
        </>
    )
}