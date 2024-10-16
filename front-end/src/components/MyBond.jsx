import {Link} from 'react-router-dom'

export default function MyBond(bond) {
    
    return (
        <>
        <Link to="/bondhighlight" style={{textDecoration:"none"}}>
            <div style={{cursor: 'pointer'}}>
                <div style={{ display: 'flex', marginLeft: 40}}>
                    <img src={bond.img} style={{height: 68, width: 76, borderTopLeftRadius: 50, borderBottomRightRadius: 50, border: '4px solid aqua'}}/>
                    </div>
                    <p style={{paddingLeft: 35, fontSize: 16, display: 'inline', whiteSpace: 'nowrap'}}><b>{bond.name}</b></p>
            </div>
        </Link>
        </>
    )
}