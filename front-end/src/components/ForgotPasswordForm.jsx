import { Link } from 'react-router-dom';

export default function ForgotPasswordForm() {
    return (
      <>
        <div style={{borderRadius: 20, paddingLeft: 20, paddingRight: 20, height: 420, marginLeft: 500, marginRight: 500, justifyContent: 'center', backgroundColor: "aqua"}}>
          <form style={{}}>
            <center>
              <h3 style={{paddingTop: 12, color:"black"}}>Forgot Password 😕</h3>
              <br/>
              <br/>
              <p style={{color:"black"}}>Enter email address below to change password:</p>
              
              <p style={{marginTop: 20, color:"black"}}>email address:</p>
              <input type="email"></input>
              <br/>
              <br/>
              <Link to="/resetpassword">
              <button style={{paddingLeft: 60, paddingRight: 60, paddingTop: 10, paddingBottom: 10, fontSize: 16, fontWeight:'bold', cursor: "pointer"}}>Reset Password</button>
              </Link>
            </center>

          </form>
        </div>
      </>
    )
}