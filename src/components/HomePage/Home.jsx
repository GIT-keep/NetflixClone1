import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import { Link } from 'react-router';

function Home() {
  const navigate = useNavigate();
  const [trendingMoviesList, setTrendingMoviesList] = useState([]);
  const [trendingError, setTrendingError] = useState(false);
  const [originalList, setOriginalList] = useState([]);
  const [originalError, setOriginalError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      const token = Cookies.get('jwt_token');
      try {
        const response = await fetch("https://apis.ccbp.in/movies-app/trending-movies", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setTrendingMoviesList(data.results);
          setTrendingError(false);
        } else {
          setTrendingError(true);
        }
      } catch {
        setTrendingError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    const fetchOriginals = async () => {
      const token = Cookies.get('jwt_token');
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const response = await fetch("https://apis.ccbp.in/movies-app/originals", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setOriginalList(data.results);
          setOriginalError(false);
        } else {
          setOriginalError(true);
        }
      } catch {
        setOriginalError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOriginals();
  }, [navigate]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#111] flex flex-col">
      
      <nav className="fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between bg-black/80 z-20">

      <div className="flex items-center gap-8">
          
          <img
            src="https://res.cloudinary.com/dnns0cphq/image/upload/v1727864135/netflix_logo_direct-Photoroom-removebg-preview2_fmlf4l.png"
            alt="Netflix Logo"
            className="h-10 cursor-pointer"
            onClick={() => handleNavigate('/home')}
          />

          <div className="hidden sm:flex gap-6 text-white text-lg">
            <button className="hover:text-red-500" onClick={() => handleNavigate('/home')}>Home</button>
            <button className="hover:text-red-500" onClick={() => handleNavigate('/popular')}>Popular</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white cursor-pointer hidden sm:block"
            onClick={() => handleNavigate('/search')}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

          <img
            src="https://i.postimg.cc/gcwC5MLM/Avatar.png"
            alt="Avatar"
            className="h-8 w-8 rounded-full cursor-pointer hidden sm:block"
            onClick={() => handleNavigate('/accounts')}
          />
          <img
            src="https://res.cloudinary.com/dudjdf428/image/upload/v1754295982/add-to-queue_1_cynvod.png"
            alt="Menu"
            className="h-8 w-8 cursor-pointer sm:hidden"
            onClick={() => setMenuOpen(prev => !prev)}
          />

        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col gap-2 py-4 px-6 sm:hidden z-20 shadow-lg">
            <button onClick={() => handleNavigate('/home')} className="text-left py-1 hover:text-red-500">Home</button>
            <button onClick={() => handleNavigate('/popular')} className="text-left py-1 hover:text-red-500">Popular</button>
            <button onClick={() => handleNavigate('/accounts')} className="text-left py-1 hover:text-red-500">Account</button>
          </div>
        )}
      </nav>

      
      <section className="w-full h-[60vh] sm:h-[90vh] bg-cover bg-center flex flex-col justify-end px-8 py-12" style={{ backgroundImage: "url('https://res.cloudinary.com/dudjdf428/image/upload/v1754038030/Image_2_x6q60d.png')" }}>
        <div className="bg-black/60 p-6 rounded-lg max-w-xl">
          <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4">Super Man</h1>
          <p className="text-white text-base sm:text-lg mb-6">
            Superman is a fictional superhero who first appeared in American comic books published by DC Comics.
          </p>
          <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">Play</button>
        </div>
      </section>

      
      <main className="flex-1 bg-black px-4 sm:px-10 py-10">
        
        <h2 className="text-white text-xl sm:text-2xl font-semibold mb-4">Trending Now</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
          </div>
        ) : trendingError ? (
          <div className="flex flex-col items-center">
            <img src="https://res.cloudinary.com/dudjdf428/image/upload/v1754138507/6076393_telgzb.jpg" className="h-12 w-12 mb-2" alt="Error" />
            <p className="text-white mb-2">Something went wrong. Please try again</p>
            <button className="bg-white px-4 py-1 rounded" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {trendingMoviesList.map(movie => (
              <Link to={`/movieDetails/${movie.id}`} key={movie.id}>
                <div className="p-2">
                  <img src={movie.poster_path} alt={movie.id} className="h-48 w-36 sm:h-60 sm:w-44 rounded-md object-cover" />
                </div>
              </Link>
            ))}
          </Slider>
        )}

        
        <h2 className="text-white text-xl sm:text-2xl font-semibold mt-10 mb-4">Originals</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
          </div>
        ) : originalError ? (
          <div className="flex flex-col items-center">
            <img src="https://res.cloudinary.com/dudjdf428/image/upload/v1754138507/6076393_telgzb.jpg" className="h-12 w-12 mb-2" alt="Error" />
            <p className="text-white mb-2">Something went wrong. Please try again</p>
            <button className="bg-white px-4 py-1 rounded" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {originalList.map(movie => (
              <Link to={`/movieDetails/${movie.id}`} key={movie.id}>
                <div className="p-2">
                  <img src={movie.poster_path} alt={movie.id} className="h-48 w-36 sm:h-60 sm:w-44 rounded-md object-cover" />
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </main>

      
      <footer className="bg-black py-6 flex flex-col items-center mt-8">
        <div className="flex gap-6 mb-2">
          <a href="#" className="text-white text-2xl hover:text-red-500"><FaGoogle /></a>
          <a href="#" className="text-white text-2xl hover:text-red-500"><FaTwitter /></a>
          <a href="#" className="text-white text-2xl hover:text-red-500"><FaInstagram /></a>
          <a href="#" className="text-white text-2xl hover:text-red-500"><FaYoutube /></a>
        </div>
        <p className="text-white text-sm">Contact Us</p>
      </footer>
    </div>
  )
}

export default Home
