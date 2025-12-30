import React from 'react';
import Cookies from 'js-cookie';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [showErrorMsg,setShowErrorMsg] = useState(false);
    const onSubmitRequest=jwtToken=>{
        Cookies.set('jwt_token',jwtToken,{expires: 30});
        navigate('/home');
    }
    const onSubmitFailure=errorMsg=>{
        setErrorMsg(errorMsg);
        setShowErrorMsg(true);
    }
    
    
    const submitForm=async (e)=>{
            e.preventDefault()
            const userDetails = {username, password};
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            let url = `${apiUrl}/login`;
            
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify(userDetails),

            }
            
            try {
                let response=await fetch(url,options)
                let data=await response.json()
                if(response.ok){
                    onSubmitRequest(data.jwt_token);
                }
                else{
                    setShowErrorMsg(true)
                    onSubmitFailure(data.error_msg)
                }
            } catch {
                setShowErrorMsg(true)
                onSubmitFailure('Failed to connect to server. Make sure backend is running.')
            }
            
        }
        
    
    
    

  return (
    <div
      className="relative min-h-screen flex flex-col items-center overflow-x-hidden bg-black sm:bg-[url('https://res.cloudinary.com/dnns0cphq/image/upload/v1727876241/netflixmain_pnigjk.jpg')] sm:bg-cover sm:bg-center text-white"
      
    >
    
      <nav className="w-full flex justify-between items-center px-[4%] py-5 relative z-10">
        <img
          src="https://res.cloudinary.com/dnns0cphq/image/upload/v1727864135/netflix_logo_direct-Photoroom-removebg-preview2_fmlf4l.png"
          alt="Netflix Logo"
          className="h-[45px] w-auto"
          
        />

        <div className="flex items-center gap-4">
          
        </div>
      </nav>

      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-[950px] w-full px-5 display-flex flex-column justify-items-center">
        <h1 className="text-[3.125rem] font-black leading-tight mb-5 hidden sm:block">
          Unlimited movies, TV
        </h1>

        <form className="bg-black bg-opacity-60 w-[90%] max-w-sm rounded-lg px-8 py-10 flex flex-col text-white" onSubmit={submitForm}>
        <h1 className="text-3xl font-bold sm:text-center mb-6 text-start">Login</h1>

        <label htmlFor="username" className="text-sm font-semibold mb-1 text-start">
            USERNAME
        </label>
        <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none mb-4"
        />

        <label htmlFor="password" className="text-sm font-semibold mb-1 text-start">
            PASSWORD
        </label>
        <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none mb-6"
        />
        {showErrorMsg && (
            <p className="text-red-500 text-sm mt-2">
                {errorMsg}
            </p>
        )}
        <button className="bg-red-600 hover:bg-red-700 transition text-white font-medium py-2 rounded text-center" >
            Login
        </button>
        
        </form>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#e50914] to-[#b20710]"></div>
    </div>
    
  );
  
}

export default Login;
