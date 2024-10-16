import homeLogo from '../assets/home.png'
import bondsLogo from '../assets/bonds.png'
import searchLogo from '../assets/search.png'
import profileLogo from '../assets/profile.png'
import { Link } from 'react-router-dom'



export default function SideBar() {
    return (
        <>
        <div style={{width: '20%', display: 'flow',  height:'610px', marginTop:0, borderTopRightRadius: 40, borderBottomRightRadius: 40, backgroundColor:'rgb(2, 244, 35)', zIndex: 100 }}>

            
            <div style={{borderTopRightRadius:40}} className="sidebar-element">
                <Link to={"/home"} style={{textDecoration: 'none'}}>
                    <img src={homeLogo} style={{borderRadius: 35, marginTop: 20 }} className="sidebar-icons" alt="Bonds logo" />
                </Link>
            </div>
             
 
            <div style={{}} className="sidebar-element">
                <Link to={"/search"} style={{textDecoration: 'none'}}>
                    <img src={searchLogo} style={{borderRadius: 35, marginTop: 8 }} className="sidebar-icons" alt="Bonds logo" />
                </Link>    
            </div>

            <div style={{}} className="sidebar-element">
                <Link to={"/options"} style={{textDecoration: 'none'}}>
                    <img src={bondsLogo} style={{borderRadius: 35, marginTop: 8 }} className="sidebar-icons" alt="Bonds logo" />
                </Link>
            </div>

            <div style={{}} className="sidebar-element">
                <Link to={"/myprofile"} style={{textDecoration: 'none'}}>
                    <img src={profileLogo} style={{borderRadius: 35, marginTop: 8 }} className="sidebar-icons" alt="Bonds logo" />
                </Link>
            </div>

            <div style={{paddingLeft: 6, paddingTop: 8, paddingBottom:8 }} className="sidebar-element">
                <center>
                <p style={{fontWeight: 'bold', cursor: "pointer"}} className="sidebar-text">Connect <br/>Bank</p>
                </center>
            </div>
        </div> 
        </>
    )
}