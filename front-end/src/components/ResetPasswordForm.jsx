import { Link } from 'react-router-dom';


export default function ResetPasswordForm() {
    return (
      <>
        <div style={{borderRadius: 20, paddingLeft: 20, paddingRight: 20, height: 630, marginLeft: 500, marginRight: 500, justifyContent: 'center', backgroundColor: "aqua"}}>
          <form style={{}}>
            <center>
              <h3 style={{paddingTop: 12, color:"black"}}>Reset Password</h3>
              <br/>
              <br/>
              <p style={{color:"black"}}>A six digit pin has been sent to ak...@outlook.com. Enter it below to reset your password.</p>
              
              <p style={{marginTop: 20, color:"black"}}>six digit pin:</p>
              <input type="text"></input>
              <br/>
              <p style={{marginTop: 20, color:"black"}}>new password:</p>
              <input type="text"></input>
              <br/>
              <p style={{marginTop: 20, color:"black"}}>confirm new password:</p>
              <input type="text"></input>
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