import React, { useContext } from 'react'
import { MusicContext } from '../context/music/MusicContext'
import { ToastContainer, toast, Slide } from 'react-toastify';

const RecivedSongItems = ({ sharedSongData }) => {

  const { addSharedMusic, removeSharedMusic,getAllSharedMusic} = useContext(MusicContext)
  
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  }

  const saveSharedSong = async (songData) => {

    const response = await addSharedMusic({
      sharedMusicId: songData.musicShared._id,
      title: songData.musicShared.title,
      audioFileLink: songData.musicShared.audioFile,
      artistName: songData.musicShared.artistName,
      thumbnailLink: songData.musicShared.thumbnail,
      duration: songData.musicShared.duration
    })
    
    if (response.success) {
      toast.success(response.message, toastOptions)
      getAllSharedMusic()
    } else {
      toast.error(response.message, toastOptions)
    }
  }

  const cancleSharedSong = async (songData) => {
    const response = await removeSharedMusic(songData.musicShared._id)
  
    if (response.success) {
      await getAllSharedMusic()
      toast.success(response.message, toastOptions)
    } else {
      toast.error(response.message, toastOptions)
    }
  }


  return (
    <div className="space-y-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div
        className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors group"
      >
        <div className="flex items-center space-x-4">
          <div className="relative shrink-0">
            <img
              src={sharedSongData.musicShared.thumbnail || "thumbnail.jfif"}
              alt="Album Cover"
              className="w-16 h-16 rounded-lg object-cover"
            />
           
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{sharedSongData.musicShared.title}</h3>
                <p className="text-gray-400 text-sm truncate">{sharedSongData.musicShared.artistName}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <img
                    src={sharedSongData.sharedBy.avatar || "avatar.png"}
                    alt="User"
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <span>{sharedSongData.sharedBy.username} </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <span className="text-xs text-gray-500">{`${Math.floor((sharedSongData.musicShared.duration) / 60)}:${Math.floor((sharedSongData.musicShared.duration) % 60)}`}</span>
                <button onClick={() => saveSharedSong(sharedSongData)} className="text-gray-400 cursor-pointer hover:text-white hover:scale-125 transition ease-in  p-1">
                  <img src="tick.svg" alt="tick" className="h-4" />
                </button>
                <button onClick={() => cancleSharedSong(sharedSongData)} className="text-gray-400 cursor-pointer hover:scale-125 transition ease-in  hover:text-white p-1">
                  <img src="cancle.svg" alt="cancle" className="h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RecivedSongItems
