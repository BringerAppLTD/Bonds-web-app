import {Link} from 'react-router-dom'


export default function SignUpInstead() {
    return (
      <>
        <Link to={"/signup"} style={{textDecoration: 'none'}}>   
          <div style={{display: 'flex', marginBottom: 30, justifyContent: 'center'}}>    
          <h5 style={{color:'white', paddingLeft: 150, paddingRight: 150}}>Sign Up Instead</h5>
          </div>
        </Link>   
      </>
    )
}