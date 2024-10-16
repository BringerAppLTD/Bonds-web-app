import {Link} from 'react-router-dom'

export default function FormABond(music) {
    return (
        <>
        <Link to={"/formabonditem"} style={{textDecoration: 'none'}}>
                <div className="formAbond-element" style={{lineHeight: 0.9, borderRadius: 12, color: 'black', cursor: 'pointer'}}>
                    <img src={music.bgImg} className="formABondImage"/>


                    <div className="formABondImageContent">
                            <div style={{display:'flex', justifyContent: 'end'}}>
                                        <p style={{fontSize: 14, paddingRight: 4, color: 'white'}}><b>{music.username}</b></p>
                                <Link to="/profile" style={{textDecoration: 'none'}}>      
                                        <img src={music.profileImg} style={{borderRadius: 19, width: 38, height: 38, marginTop: 16, marginRight:12 }}/>
                                </Link>
                            </div>
                            <p style={{fontSize: 14, color: 'white'}}>{music.artistName}: <br/><b>{music.songTitle}</b></p>
                    </div>
                </div>
        </Link>
        </>
    )
}