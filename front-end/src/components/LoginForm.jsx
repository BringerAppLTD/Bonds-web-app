import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function LoginForm() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Function to handle form submission
    const onSubmit = async (data) => {
      setIsLoading(true); // Start loading
      setError(''); // Clear previous errors


      try {
        // Send login request to server
        const response = await axios.post('http://localhost:5000/login', data);
        navigate('/home')
        // Save the token or handle successful login
        localStorage.setItem('token', response.data.token); // Save JWT token to localStorage

      } catch (err) {
          setError('Invalid credentials, please try again.');
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    return (
      <>
       <center>
        <section style={{borderRadius: 20, height: 420, justifyContent: 'center', backgroundColor: "aqua"}}>

          {/* Preloader */}
          {isLoading && <p>Loading...</p>} {/* Show this when loading */}

          {/* Error Message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <center>
              <h3 style={{paddingTop: 6, color:"black"}}>Login 💚</h3>

              <label htmlFor='username' style={{color:"black"}}>Username:</label>
              <br/>
              <input
                  type="text"
                  placeholder="Username"
                  {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p>{errors.username.message}</p>}

              <br/>
              <br/>

              <label htmlFor='password' style={{color:"black"}}>Password:</label>
              <br/>
              <input
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p>{errors.password.message}</p>}

              <br/>

              <Link to="/forgotpassword" style={{textDecoration: 'none'}}>
              <h5 style={{marginTop: 20, color:"black"}}>Forgot Password?</h5>
              </Link>

              <button type = 'submit' disabled={isLoading} style={{paddingLeft: 60, paddingRight: 60, paddingTop: 10, paddingBottom: 10, fontSize: 16, fontWeight:'bold', cursor: "pointer"}}>Login</button>
            </center>
          </form>
        </section>
      </center>  
      </>
    )
}