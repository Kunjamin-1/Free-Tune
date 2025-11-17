import  {  useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

const Navbar = () => {
  const [sideBarDisplay, setSideBarDisplay] = useState(false)
  
  const location = useLocation()
  const navigate = useNavigate()

  const toggleSideBar = () => {
    setSideBarDisplay(!sideBarDisplay)
  }
  useEffect(() => {
    if(location.pathname === "/"){
      document.querySelector("title").innerText = "FreeTune - Home"

    }else if(location.pathname === "/recived-song"){
      document.querySelector("title").innerText = `FreeTune - RecivedSong`
    }else if(location.pathname === "/library"){
      document.querySelector("title").innerText = `FreeTune - Library`
    }else if(location.pathname === "/upload"){
      document.querySelector("title").innerText = `FreeTune - Upload`
    }

  }, [location.pathname])
  
  const navigateToProfile = ()=>{
    navigate("/user-profile")
  }
  return (
    <header className="bg-[#1F2937]">
      <div className="max-w-7xl py-0.5 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center  space-x-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <img src="music.svg" alt="musicIcon" />
              </div>
              <h1 className="text-2xl font-bold ">FreeTune</h1>
            </div>

            <nav className="hidden md:flex space-x-6">
              <Link to="/" className={`${location.pathname === "/" &&"text-purple-400" } ${!localStorage.getItem("accessToken") && `pointer-events-none`} font-medium text-gray-400 hover: transition-colors`}>
                Home
              </Link>
              <Link
                to="/library"
                className={`${location.pathname === "/library" && "text-purple-400" } ${!localStorage.getItem("accessToken") && `pointer-events-none`} font-medium text-gray-400 hover: transition-colors`}
              >
                Library
              </Link>
              <Link
                to="/upload"
                className={`${location.pathname === "/upload" && "text-purple-400" } ${!localStorage.getItem("accessToken") && `pointer-events-none`} font-medium text-gray-400 hover: transition-colors`}
              >
                Upload
              </Link>
              <Link
                to="/recived-song"
                className={`${location.pathname === "/recived-song" && "text-purple-400" } ${!localStorage.getItem("accessToken") && `pointer-events-none`} font-medium text-gray-400 hover: transition-colors`}
              >
                Recived Song
              </Link>
             
            </nav>
          </div>

          <div className="hidden cursor-pointer md:flex items-center space-x-4">
       
            <div onClick={navigateToProfile} className=" cursor-pointer bg-white rounded-full flex items-center justify-center">
              <img src="user.svg" alt="user" />
            </div>
          </div>

          <div className='md:hidden'>
            <img src="humburger.svg" onClick={toggleSideBar} alt="humburger" />
            <Sidebar closeSideBar = {toggleSideBar} display={sideBarDisplay} />
          </div>
        </div>

      </div>
    </header>


  )
}

export default Navbar
