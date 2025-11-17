import React, { useContext, useEffect, useState } from "react";
import { MusicContext } from "../context/music/MusicContext";
import LibraryMusicCard from './LibraryMusicCard'
const Library = () => {
  const { musics, getAllMusic } = useContext(MusicContext)
  
  useEffect(() => {
    if (!musics || musics.length === 0) {
      getAllMusic();
    }
  }, [])


  return (
    <div className="px-4 py-6 h-full md:px-12 md:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">

      {musics.map(music => {
        return <LibraryMusicCard key={music._id} musicData={music} />
      })
      }
      {

        musics.length === 0 && <div className=" grid  col-start-3 text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-400 mb-2">No  songs uploaded yet</h3>
          <p className="text-gray-500 text-xl mb-6">
            When you will upload songs , they'll appear here
          </p>
        </div>
      }
    </div>
  )
}

export default Library
