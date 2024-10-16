import {Link} from 'react-router-dom'

export default function LoginInstead() {
    return (
      <>
        <Link to={"/login"} style={{textDecoration: 'none'}}> 
          <div style={{display: 'flex', marginBottom: 20, justifyContent: 'center'}}>    
            <h5 style={{color:'white', paddingLeft: 150, paddingRight: 150}}>Login Instead</h5>
          </div>
        </Link>   
      </>
    )
  }
  