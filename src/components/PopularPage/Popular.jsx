import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router';

function Popular() {
    const [loading, setLoading] = useState(true);
    const[menuOpen,setMenuOpen]=useState(false)
    const navigate=useNavigate()
    const homePage=()=>{
        navigate('/home')
    }
    const goAccounts=()=>{
        navigate('/accounts')
        console.log("clicked")
    }
    const [popularList,setPopularList]=useState([])
    useEffect(()=>{
        const popularMovies=async()=>{
            const token=Cookies.get('jwt_token')
            let url="https://apis.ccbp.in/movies-app/popular-movies"
            if(!token){
            navigate('/')
          }
            let options={
                method:"GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            let response=await fetch(url,options)
            let data=await response.json()
            if(response.ok){
                setPopularList(data.results)
                setLoading(false)  
            }
        }
        popularMovies()
    },)

    const searchPageIcon=()=>{
      navigate('/search')
    }
    
 const toggleMenu=()=>{
  setMenuOpen(prev=>!prev)
}
  return (
    <div className=" bg-black">
        <nav className=" flex w-full  px-[4%] py-5 relative z-10 h-[9vh] sm:h-[15vh]">
          <div className="flex flex-column  w-full ">
            <div className="w-full flex">
              <img
                src="https://res.cloudinary.com/dnns0cphq/image/upload/v1727864135/netflix_logo_direct-Photoroom-removebg-preview2_fmlf4l.png"
                alt="Netflix Logo"
                className="h-[45px] w-auto cursor-pointer"
                 onClick={homePage}
              />
            
              <div className="flex gap-4 ml-5 mt-3 text-white">
                  <p onClick={homePage} className="cursor-pointer hidden sm:block">Home</p>
                  <p className="hidden sm:block">Popular</p>
              </div>
            
              <div className="flex w-[100vw] h-[10vh] justify-items-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-3 ml-auto text-white h-[4vh] cursor-pointer" onClick={searchPageIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <img src="https://i.postimg.cc/gcwC5MLM/Avatar.png" className="h-[5vh] mt-[5px] ml-4 w-[35px] cursor-pointer hidden sm:block" onClick={goAccounts}/>
                <img src="https://res.cloudinary.com/dudjdf428/image/upload/v1754295982/add-to-queue_1_cynvod.png" className="h-[4vh] mt-[10px] ml-4 w-[30px] cursor-pointer sm:hidden" onClick={toggleMenu}/>
              </div>
            </div>
            
          </div>
        </nav>
        {menuOpen&&
        <div className="flex flex-row ml-10 text-white mb-3">
          <div>
            <p onClick={homePage} className="cursor-pointer mb-1">Home</p>
            <p className='font-[500] mb-1 text-[18px]'>Popular</p>
            <p onClick={goAccounts} className="cursor-pointer mb-1">Account</p>
          </div>
        </div>}
        
        {loading?
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
        </div>:
          <div className="flex flex-wrap gap-10 justify-center"> 
            {popularList.map(movie => (
              <Link to={`/movieDetails/${movie.id}`} key={movie.id}>
                <img src={movie.poster_path} alt={movie.id} className="sm:h-[190px] sm:w-[254px] rounded-md h-[14vh] w-[20vw]"/>
                            
              </Link>
            ))}  
        </div>
        }
        
        <footer className="p-10 gap-5 h-[19vh] w-full bg-black flex flex-col items-center justify-center">
                  <div className="flex gap-5 ">
                    <p className="text-white w-[2vw] h-[2vh]"><FaGoogle /></p>
                    <p className="text-white w-[2vw] h-[2vh]"><FaTwitter /></p>
                    <p className="text-white w-[2vw] h-[2vh]"><FaInstagram /></p>
                    <p className="text-white w-[2vw] h-[2vh]"><FaYoutube /></p>
                  </div>
                  
                  <p className="text-white">Contact Us</p>
        </footer>
      
    </div>
  )
}

export default Popular
