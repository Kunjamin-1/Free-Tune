import React, { useRef, useContext, useState } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { MusicContext } from '../context/music/MusicContext'
import ShareSong from "./ShareSong";

const LibraryMusicCard = ({ musicData }) => {
  const {getAllMusic, isSongPlaying, setIsSongPlaying, currentSong,  setCurrentSong, deleteMusic } = useContext(MusicContext)

  const temp = useRef(null)

  const [shareSong, setShareSong] = useState(false)

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

  const playSong = (song) => {
    if (currentSong?._id === song._id) {
      setIsSongPlaying(!isSongPlaying); // toggle pause/play
    } else {
      setCurrentSong(song);             // new song to play
      setIsSongPlaying(true);
    }
  }

  const shareBtnClicked = () => {
    setShareSong(!shareSong)
  }

  const deleteMusicBtnClicked = async (id) => {
    const response = await deleteMusic(id)
    
    if (response.success) {
      toast.success(response.message, toastOptions)
      getAllMusic()
    } else {
      toast.error(response.message, toastOptions)
    }
  }


  return (
    <div className="bg-gray-800 rounded-lg  p-4 md:p-6 hover:bg-gray-700 transition-colors group">
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
      <div className="relative mb-4">
        <img
          src={musicData.thumbnail || "thumbnail.jfif"}
          alt="Album Cover"
          className="w-full aspect-square object-cover cursor-pointer rounded-lg"
        />

        <div className="absolute inset-0 bg-black/50 md:opacity-0 md:group-hover:opacity-100  md:transition-opacity rounded-lg flex items-center justify-center">
          <button onClick={() => playSong(musicData)}
            type="button"
            className="bg-purple-600 cursor-pointer hover:bg-purple-500 text-white p-3 md:p-4 rounded-full transition-colors"
            
          >
            <img src={`${musicData._id === currentSong._id && isSongPlaying? "pause" : "play"}.svg`} alt={musicData._id === currentSong._id && isSongPlaying? "pause" : "play"} className="h-5  " />
            <audio className="hidden" controls ref={temp} src={musicData.audioFile}></audio>
          </button>
        </div>
      </div>

      <h3 className="font-semibold capitalize text-white mb-1 md:mb-2 truncate text-sm md:text-base">
        {musicData.title}
      </h3>
      <p className="text-gray-400 capitalize text-xs md:text-sm mb-2 truncate">
        {musicData.artistName}
      </p>

      <div className="flex items-center justify-between text-xs md:text-sm">
        <span className="text-gray-400">{`${Math.floor(musicData.duration / 60)}:${Math.floor(musicData.duration % 60)}`}</span>
        <div className="flex items-center relative gap-3">
          <button
            type="button"
            onClick={shareBtnClicked}
            className="text-gray-400  hover:text-blue-500 transition-colors"
            aria-label="Share"
          >
            <img src="share.svg" alt="share" className="h-3 hover:scale-150 transition ease-in cursor-pointer" />

          </button>
          <div className={`${!shareSong ? "hidden" : "block"} absolute bottom-6 -right-8`}>
            <ShareSong musicId={musicData?._id} />
          </div>
          <button
            type="button"
            onClick={() => deleteMusicBtnClicked(musicData?._id)}
            className="text-gray-400 hover:text-red-400 transition-colors"
            aria-label="Delete"
          >
            <img src="delete.svg" alt="delete" className="h-3 hover:scale-150 transition ease-in cursor-pointer" />
          </button>
        </div>
      </div>
    </div>


  );
};

export default LibraryMusicCard;
