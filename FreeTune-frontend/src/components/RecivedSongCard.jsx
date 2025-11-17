import { useContext, useEffect } from 'react'
import RecivedSongItems from './RecivedSongItems'
import { MusicContext } from '../context/music/MusicContext'

const RecivedSongCard = () => {

  const { allSharedSongs, getAllSharedMusic } = useContext(MusicContext)

  useEffect(() => {
    getAllSharedMusic()
  }, [])

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main>
        {allSharedSongs && allSharedSongs.length !== 0 ? allSharedSongs.map((sharedSong) => {
          return <RecivedSongItems key={sharedSong.createdAt} sharedSongData={sharedSong} />
        }) : <div className=" text-center py-16">
         
          <h3 className="text-2xl font-semibold text-gray-400 mb-2">No shared songs yet</h3>
          <p className="text-gray-500 text-xl mb-6">
            When friends share songs with you, they'll appear here
          </p>
        </div>

        }
      </main>

     
    </div>
  )
}

export default RecivedSongCard
