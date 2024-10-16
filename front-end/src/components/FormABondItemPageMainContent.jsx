import Header from "./Header"
import dune from '../assets/dune.png'
import { Link } from 'react-router-dom'
import audio from '../assets/finesse.mp3'
import jimmy from '../assets/jimmy.jpg'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import party from '../assets/confettii.gif'

export default function FormABondItemPageMainContent() {
    const [email, setEmail] = useState('');
    const [transactionRef, setTransactionRef] = useState(`tx-${Date.now()}`);
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pin, setPin] = useState('');
    const [flwRef, setFlwRef] = useState('');
    const [requiresPin, setRequiresPin] = useState(false);
    const [requiresOtp, setRequiresOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set a predefined amount for the payment
    const amount = 100; // Example fixed amount in USD or any other currency

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
          card_number: cardNumber,
          cvv,
          email: email,
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          currency: 'NGN',
          amount,
          fullname,
          phone_number: phoneNumber,
          tx_ref: `MC-${Date.now()}`, // Unique transaction reference
        };
    
        try {
          setIsSubmitting(true);
          const response = await axios.post('http://localhost:5000/pay', payload);
          console.log(response.data);
    
          if (response.data.meta.authorization.mode === 'pin') {
            setRequiresPin(true); // Show PIN input form
          } else if (response.data.meta.authorization.mode === 'redirect') {
            window.location.href = response.data.meta.authorization.redirect; // Redirect for 3DS
          }
        } catch (error) {
          console.error('Payment Error:', error);
        } finally {
          setIsSubmitting(false);
        }
    };
    
    const handlePinSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
          card_number: cardNumber,
          cvv,
          email:email,
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          currency: 'NGN',
          amount,
          fullname,
          phone_number: phoneNumber,
          tx_ref: `MC-${Date.now()}`, // Unique transaction reference
          pin,
        };
    
        try {
          const response = await axios.post('http://localhost:5000/pay/pin', payload);
          console.log(response.data);
    
          if (response.data.message === 'OTP required') {
            setRequiresOtp(true);
            setFlwRef(response.data.flw_ref);
          } else {
            alert('Payment Successful!');
          }
        } catch (error) {
          console.error('Error Submitting PIN:', error);
        }
    };
    
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
          otp,
          flw_ref: flwRef,
        };
    
        try {
          const response = await axios.post('http://localhost:5000/validate-otp', payload);
          console.log(response.data);
    
          if (response.data.status === 'success') {
            alert('Payment Successful!');
          }
        } catch (error) {
          console.error('OTP Submission Error:', error);
        }
    };

    const formContainer = {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundImage: `url(${party})`,
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    };
    
    const inputContainer = {
        marginBottom: '20px',
    };
    
    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '600',
        fontSize: '14px',
        color: '#333',
    };
    
    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',
    };
    
    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '20px',
    };
    
    const disabledButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#cccccc',
        cursor: 'not-allowed',
    };
    
    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        fontWeight: '600',
        color: '#333',
    };
    
    const twoColumnStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    };
    
    const halfInputStyle = {
        ...inputStyle,
        width: '48%',
    };

    const pinOtpStyle = {
        width: '320px',
        padding: '10px',
        margin: '10px 0',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };
    return (
        <>
            <div style={{ color:'white',  width: '80%', marginTop:0, float:'left' }}> 
                    
                    {/* <Header/> */}
                    <div style={{display: 'flex', marginTop:20}}>
                        <Link to={"/formabond"} style={{textDecoration: 'none'}}>
                            <p style={{width: '17%',  whiteSpace: 'nowrap'}}> Back</p>
                        </Link>
                        <p style={{width: '80%'}}><b>Form a Bond</b></p>
                    </div>
                    

                    <div className="formABond-Bg-Image" style={{height: 147, lineHeight: 1, width: 147, borderRadius: 12}}>
                        <div style={{display:'flex', justifyContent: 'end'}}>
                                <p style={{fontSize: 14, marginTop: 22, paddingRight: 4, color: 'white'}}><b>thevictorjimmy</b></p>
                                <Link to="/profile" style={{textDecoration: 'none'}}>      
                                    <img src={jimmy} style={{display:'block', borderRadius: 19, width: 30, height: 30, marginTop: 16, marginRight:12 }}/>
                                </Link>
                        </div>
                        
                    </div>


                    
                    <div style={{width: '100%'}}>
                        <p style={{fontSize:15}}><b>Odunsi (The Engine) : No PDA!</b></p>
                    </div>
                    

                    <audio loop src={audio} controls style={{height:20, width: 200}}>
                    </audio>
                     <br/>
                     
                    

                    <div style={{ marginTop:20, marginLeft:15, marginRight:15, whiteSpace: 'wrap', overflowY:'auto', height: 235}}>
                    <div style={formContainer}>
                        <h2 style={headingStyle}>Form a Bond</h2>

                        {/* Main Card Form */}
                        {!requiresPin && !requiresOtp && (
                            <form onSubmit={handleSubmit}>
                            <div style={inputContainer}>
                                <label style={labelStyle} htmlFor="fullname">Full Name</label>
                                <input
                                style={inputStyle}
                                type="text"
                                id="fullname"
                                placeholder="Full Name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                                />
                            </div>

                            <div style={inputContainer}>
                                <label style={labelStyle} htmlFor="cardNumber">Card Number</label>
                                <input
                                style={inputStyle}
                                type="text"
                                id="cardNumber"
                                placeholder="1234 1234 1234 1234"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                />
                            </div>

                            <div style={inputContainer}>
                                <label style={labelStyle} htmlFor="expiryMonth">Expiry Month</label>
                                <input
                                style={inputStyle}
                                type="text"
                                id="expiryMonth"
                                placeholder="MM"
                                value={expiryMonth}
                                onChange={(e) => setExpiryMonth(e.target.value)}
                                required
                                />
                            </div>

                            <div style={inputContainer}>
                                <label style={labelStyle} htmlFor="expiryYear">Expiry Year</label>
                                <input
                                style={inputStyle}
                                type="text"
                                id="expiryYear"
                                placeholder="YY"
                                value={expiryYear}
                                onChange={(e) => setExpiryYear(e.target.value)}
                                required
                                />
                            </div>

                            <div style={inputContainer}>
                                <label style={labelStyle} htmlFor="cvv">CVV</label>
                                <input
                                style={inputStyle}
                                type="text"
                                id="cvv"
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                                />
                            </div>

                            <div style={inputContainer}>
                                <label style={labelStyle} htmlFor="amount">Amount</label>
                                <p style={{color:'black'}}>
                                NGN {amount}
                                </p>
                            </div>

                            <div style={inputContainer}>
                                <label style={labelStyle} htmlFor="phoneNumber">Phone Number</label>
                                <input
                                style={inputStyle}
                                type="text"
                                id="phoneNumber"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                />
                            </div>

                            <button
                                type="submit"
                                style={isSubmitting ? disabledButtonStyle : buttonStyle}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : 'Form Bond'}
                            </button>
                            </form>
                        )}

                        {/* PIN Input Form */}
                        {requiresPin && !requiresOtp && (
                            <form onSubmit={handlePinSubmit}>
                            <h2 style={headingStyle}>Enter Your PIN</h2>
                            <div style={inputContainer}>
                                <input
                                style={inputStyle}
                                type="password"
                                placeholder="Enter PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                required
                                />
                            </div>
                            <button type="submit" style={buttonStyle}>
                                Submit PIN
                            </button>
                            </form>
                        )}

                        {/* OTP Input Form */}
                        {requiresOtp && (
                            <form onSubmit={handleOtpSubmit}>
                            <h2 style={headingStyle}>Enter OTP</h2>
                            <div style={inputContainer}>
                                <input
                                style={inputStyle}
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                />
                            </div>
                            <button type="submit" style={buttonStyle}>
                                Submit OTP
                            </button>
                            </form>
                        )}
                        </div>
                    </div>


            </div>          
        </>          
    )
}