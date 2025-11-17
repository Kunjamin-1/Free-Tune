import React, { useContext, useState } from 'react'
import { MusicContext } from '../context/music/MusicContext'


const HomeLibrarySongCard = ({ musicData }) => {
  const { isSongPlaying, setIsSongPlaying, currentSong, setCurrentSong } = useContext(MusicContext)


  const controlSong = (song) => {

    if (currentSong._id === song._id) {
      setIsSongPlaying(!isSongPlaying); // toggle pause/play
    } else {
      setCurrentSong(song);             // new song to play
      setIsSongPlaying(true);
    }

  };


  return (
    <div className="bg-linear-to-br from-gray-800 via-gray-800 to-purple-900/20 rounded-2xl p-6 border border-purple-500/20 hover:-translate-y-2 transition-all">
      <div className="relative max-w-full mb-4">

        <img src={musicData?.thumbnail || "thumbnail.jfif"} alt={musicData?.title}
        className="w-full aspect-square object-cover cursor-pointer rounded-lg"
         />

        <button
          onClick={() => controlSong(musicData)}
          className="absolute cursor-pointer bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <img
            src={currentSong?._id === musicData?._id && isSongPlaying ? "pause.svg" : "play.svg"}
            alt={currentSong?._id === musicData?._id && isSongPlaying ? "pause.svg" : "play.svg"}
            className="h-4 cursor-pointer text-white"
          />
        </button>
      </div>
      <h3 className="font-semibold capitalize text-white mb-2">{musicData?.title}</h3>
      <p className="text-gray-400 capitalize text-sm mb-3">{musicData?.artistName}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {`${Math.floor(musicData?.duration / 60)}:${Math.floor(musicData?.duration % 60)}`}
        </span>
      </div>
    </div>
  )
}

export default HomeLibrarySongCard
