import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Checkbox, 
  Label, 
  TextInput 
} from "flowbite-react";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI, loginAPI, googleLoginAPI } from '../services/apiService';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; 
function Auth({ insideRegister }) {
  const navigate = useNavigate();
  
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  });

  // register
  const handleRegister = async () => {
    try {
      const response = await registerAPI(userDetails);
      console.log("Registration successful:", response);
      alert("Registration successful! Please login.");
      navigate('/login');
    } catch (err) {
      console.error("Registration failed:", err);
      if (err.response && err.response.status === 409) {
        alert("User already exists! Please login instead.");
      } else {
        alert("Registration failed. Please check your backend connection.");
      }
    }
  };

 // login
  const handleLogin = async () => {
    try {
      const response = await loginAPI(userDetails);
      console.log("Login successful:", response);
      if(response.status === 200){
        sessionStorage.setItem("userData", JSON.stringify(response.data.existingUser));
        sessionStorage.setItem("userToken", response.data.token);
        alert("Login successful!");
        
        // Role-based redirection
        const role = response.data.existingUser.role;
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  // google auth
  const handleGoogleLogin = async(credentials) => {
    try {
      console.log(credentials);
      const { email, name, picture } = credentials;
      const res = await googleLoginAPI({ email, password: 'googlePassword', username: name, picture: picture });
      console.log(res);
      
      if (res.status === 200 || res.status === 201) {
        const userData = res.data.existingUser || res.data.newUser;
        
        sessionStorage.setItem("userData", JSON.stringify({
          username: userData.username,
          email: userData.email,
          picture: userData.picture,
          role: userData.role
        }));
        sessionStorage.setItem("userToken", res.data.token);
        alert("Login successful!");
        
        // Role-based redirection
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Google Authentication failed.");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (insideRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };


  const handleGoogleAuth = () => {
    console.log(insideRegister ? 'Google Sign Up Clicked' : 'Google Login Clicked');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: `url('https://i1.pickpik.com/photos/30/806/395/book-stack-library-reading-preview.jpg')` }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <Card className="relative z-10 max-w-md w-full shadow-2xl border border-sky-800 bg-sky-950/95 backdrop-blur-md text-white">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-white tracking-wide uppercase">
            {insideRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-sky-200 mt-1">
            {insideRegister 
              ? "Join our Bookstore community today" 
              : "Login to access your Bookstore account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">      
          {insideRegister && (
            <div>
              <div className="mb-1 block">
                <Label htmlFor="username" value="Full Name" className="text-sky-200 font-semibold" />
              </div>
              <TextInput
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                id="username"
                type="text"
                placeholder="Username"
                icon={FaUser}
                required
                className="[&>div>input]:bg-sky-900/50 [&>div>input]:text-white [&>div>input]:border-sky-700 [&>div>input]:focus:border-sky-400 [&>div>input]:focus:ring-sky-400"
              />
            </div>
          )}

          <div>
            <div className="mb-1 block">
              <Label htmlFor="email" value="Your Email" className="text-sky-200 font-semibold" />
            </div>
            <TextInput
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              id="email"
              type="email"
              placeholder="name@example.com"
              icon={FaEnvelope}
              required
              className="[&>div>input]:bg-sky-900/50 [&>div>input]:text-white [&>div>input]:border-sky-700 [&>div>input]:focus:border-sky-400 [&>div>input]:focus:ring-sky-400"
            />
          </div>

          <div>
            <div className="mb-1 block">
              <Label htmlFor="password" value="Your Password" className="text-sky-200 font-semibold" />
            </div>
            <TextInput
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              id="password"
              type="password"
              placeholder="••••••••"
              icon={FaLock}
              required
              className="[&>div>input]:bg-sky-900/50 [&>div>input]:text-white [&>div>input]:border-sky-700 [&>div>input]:focus:border-sky-400 [&>div>input]:focus:ring-sky-400"
            />
          </div>

          {!insideRegister && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" className="text-sky-600 focus:ring-sky-500 bg-sky-900 border-sky-700" />
                <Label htmlFor="remember" className="text-sky-200 cursor-pointer">Remember me</Label>
              </div>
              <a href="#" className="text-sky-300 hover:underline font-medium">
                Forgot password?
              </a>
            </div>
          )}

          <Button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white font-semibold mt-2 transition-colors">
            {insideRegister ? "Register" : "Login"}
          </Button>

          <div className="flex items-center my-1">
            <div className="flex grow border-t border-sky-800"></div>
            <span className="px-3 text-sky-400 text-xs uppercase tracking-wider font-semibold">Or</span>
            <div className="flex grow border-t border-sky-800"></div>
          </div>
{/* google Auth */}
         <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    let decode = jwtDecode(credentialResponse.credential)
    console.log(decode);
    handleGoogleLogin(decode)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

          <div className="text-center text-sm text-sky-200 mt-2">
            {insideRegister ? (
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-sky-300 hover:underline font-semibold">
                  Login here
                </Link>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-sky-300 hover:underline font-semibold">
                  Register here
                </Link>
              </p>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Auth;