import {Link} from 'react-router-dom'

export default function Date(date) {
    return (
        <>
        <Link to={"/formabonditem"} style={{textDecoration: 'none'}}>
                <div className="formAbond-element" style={{lineHeight: 0.9, borderRadius: 12, color: 'black', cursor: 'pointer'}}>
                    <img src={date.songPic} className="formABondImage"/>

                    <div className="formABondImageContent" style={{bottom:28}}>
                            <div style={{justifyContent: 'center'}}>
                            <p style={{fontSize: 14, color: 'white'}}>{date.artistName}: <br/><b>{date.songTitle}</b></p> 
                            </div>
                    </div>
                </div>
        </Link>
        </>
    )
}