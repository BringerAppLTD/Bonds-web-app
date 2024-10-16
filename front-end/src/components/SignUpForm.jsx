import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function SignUpForm() {
    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:5000/signup', data);
            navigate('/home')
            localStorage.setItem('token', response.data.token);
            
        } catch (error) {
            alert(error.response.data.error); // Handle duplicate username/email
        }
    };
    
    return (
      <>
        <center>
                <section style={{backgroundColor: "aqua", borderRadius: 30}}> 
                    
                    <h1 style={{color: "black"}}>Sign Up ❤️</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        

                        <label htmlFor="username" style={{color: "black"}}>
                            Username:
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                        
                        <label htmlFor="email" style={{color: "black"}}>
                            Email:
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}

                        
                        <label htmlFor="password" style={{color: "black"}}>
                            Password:
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                        

                        <button type="submit" style={{cursor: "pointer"}}>Sign Up</button>
                    </form>
                </section>
        </center>
      </>
    )
}