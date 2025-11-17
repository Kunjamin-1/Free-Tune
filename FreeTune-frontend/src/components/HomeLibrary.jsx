import { useContext, useEffect, useState } from 'react'
import { MusicContext } from '../context/music/MusicContext'
import { useNavigate } from 'react-router-dom'
import HomeLibrarySongCard from "./HomeLibrarySongCard"

const HomeLibrary = () => {
  const { musics } = useContext(MusicContext)
  const [homeDisplayMusics, setHomeDisplayMusics] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(musics.length > 4){
     const slicedArr = musics.slice(0,4)
    
     setHomeDisplayMusics(slicedArr)
    }else{
      setHomeDisplayMusics(musics)
    }
  }, [])


  const navigateToLibrary = () => {
    navigate("/library")
  }
  return (
    <section className="w-11/12 mx-auto mb-12">
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white rounded-lg">
        <div className="max-w-8xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Your Music
            </h2>
            <button onClick={navigateToLibrary} className="text-purple-400 hover:text-purple-300 transition-colors font-medium flex justify-center items-center cursor-pointer">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {
              homeDisplayMusics.map(music => {
                return <HomeLibrarySongCard key={music._id} musicData={music} />
              })
            }
          </div>
        </div>


      </section>
    </section>


  )
}


export default HomeLibrary
