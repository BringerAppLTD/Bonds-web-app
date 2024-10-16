
import bondsLogo from '../assets/bonds.png'


export default function TopBar() {
  return (
    <> 
      <center>
        <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
          <h1 style={{color:'white', width: '50%', marginTop:23}}>Bonds</h1>

          <a href="/" target="_blank" style={{width: '50%'}}>
            <img src={bondsLogo} style={{height: 100, width: 100}} className="logo react" alt="Bonds logo" />
          </a>

        </div>
      </center>
    </>
  )
}
