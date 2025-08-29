import React from 'react'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
function SearchPage() {
    const navigate=useNavigate()
  const [searchInput,setSearchInput]=useState('')
  const [moviesList,setMoviesList]=useState([])
  const [loading,setLoading]=useState(true)
  const[menuOpen,setMenuOpen]=useState(false)
  const popularNavigation=()=>{
    navigate('/popular')
  }
  const homeNavigation=()=>{
        navigate('/home')
    }
  const goAccounts=()=>{
    navigate('/accounts')
  }
  useEffect(()=>{
    const searchMovies=async()=>{
        const token=Cookies.get('jwt_token')
        const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`;
        if(!token){
          navigate('/')
        }
        let options={
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        let response=await fetch(url,options)
        let data=await response.json()
        if(response.ok){
            setMoviesList(data.results)
            setLoading(false)
        }
    }
    searchMovies()
  },[searchInput])
  const toggleMenu=()=>{
  setMenuOpen(prev=>!prev)
}
  const popularPage=()=>{
    navigate('/popular')
  }
  return (
    <div className="bg-black  w-full ">
      <nav className=" flex flex-col  w-full  px-[4%] py-5 relative z-10 sm:h-[20vh] bg-cover">
        <div className="flex flex-column  w-full ">
          <div className="w-full flex">
            <img
              src="https://res.cloudinary.com/dnns0cphq/image/upload/v1727864135/netflix_logo_direct-Photoroom-removebg-preview2_fmlf4l.png"
              alt="Netflix Logo"
              className="h-[45px] w-auto cursor-pointer"
               onClick={homeNavigation}
            />
          
            <div className="sm:flex gap-4 ml-5 mt-3 text-white hidden sm:block">
                <p onClick={homeNavigation} className="cursor-pointer">Home</p>
                <p  className="cursor-pointer" onClick={popularNavigation}>Popular</p>
            </div>   
            <div className="flex w-[100vw] sm:h-[10vh] justify-end sm:justify-end">
                <input type="text" className="bg-black sm:h-[5vh] h-[3vh] w-[30vw] sm:w-[15vw] border border-white sm:mt-2 rounded-l-md text-white p-1 mt-3" onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search'/>
                <label for="searchbox">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  rounded-r-sm sm:mt-2 text-white sm:h-[34px] sm:w-[28px] cursor-pointer bg-gray-500 border border-white text-white h-[27px] mt-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </label>
            </div>
            <img src="https://i.postimg.cc/gcwC5MLM/Avatar.png" className="h-[5vh] mt-[5px] ml-4 w-[35px] cursor-pointer hidden sm:block" onClick={goAccounts}/>
            <img src="https://res.cloudinary.com/dudjdf428/image/upload/v1754295982/add-to-queue_1_cynvod.png" className="h-[4vh] mt-[5px] ml-4 w-[30px] cursor-pointer sm:hidden" onClick={toggleMenu}/>
          </div>
        </div>  
      </nav>
       {menuOpen&&
        <div className="flex flex-row ml-10 text-white mb-3">
          <div>
            <p className="cursor-pointer">Home</p>
            <p onClick={popularPage}>Popular</p>
            <p onClick={goAccounts} className="cursor-pointer">Account</p>
          </div>
      </div>}

      <div>
      {loading?
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>:(
        <div>
          {moviesList.length===0?
            <div className="flex flex-col justify-center h-[100vh] items-center bg-black ">
              <img src="https://res.cloudinary.com/dudjdf428/image/upload/v1754130805/Group_7394_fuha3y.png" className="h-[60vh] w-[40vw]"/>
              <p className='text-white mt-6 text-[20px]'>Your search for {searchInput} did not find any matches</p>
            </div>:
            <div className=" flex flex-wrap sm:gap-5 sm:ml-5 justify-center gap-3">
              {moviesList.map(movie => (
                <Link to={`/movieDetails/${movie.id}`} key={movie.id}>
                  <img src={movie.poster_path} alt={movie.id} className="sm:h-[190px] sm:w-[254px] h-[17vh] rounded-md"/>                      
                </Link>
                ))}  
            </div>}
          </div>
      )}
      
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

      
    </div>
  )
}

export default SearchPage
