import React from 'react'
import { useNavigate } from 'react-router'
function NotFound() {
const navigate=useNavigate()
const foundHome=()=>{
    navigate('/home')
}
  return (
    
    <div className="bg-[url('https://i.postimg.cc/Qd21yq2D/snow-removal-machine-working-high-ski-slope-snowstorm-454047-2149-1.png')] h-[100vh] w-full bg-cover flex flex-col justify-center items-center">
        
            <p className="sm:text-[70px] text-white font-[600] text-[40px]">Lost Your Way ?</p>
            <p className="sm:text-[20px] text-white text-[15px] text-center sm:text-start">we are sorry the page you requested could not be found Please go back to the homepage.</p>
            <button className="bg-white p-3 mt-5 rounded-md cursor-pointer" onClick={foundHome}>Go to Home</button>
    </div>
  )
}

export default NotFound
