import React, { useContext, useEffect, useState } from 'react'
import { MusicContext } from '../context/music/MusicContext'

const QuickStats = () => {

  const { musics } = useContext(MusicContext)
  const [musicStats, setMusicStats] = useState({ totalSongs: 0, totalDuration: 0, sharedSong: 0 })

  const calculateMusicStats = () => {
    const totalSongs = musics.length
    let totalDuration = 0
    musics.forEach(music => {
      totalDuration += music.duration
    });
    let sharedSong = musics.filter(music => music.isShared === true)

    setMusicStats({
      totalSongs,
      totalDuration: totalDuration < 3600 ? totalDuration === 0? 0 : `${Math.floor(totalDuration / 60)}:${Math.floor(totalDuration % 60)}m` : `${Math.floor(totalDuration / 3600)}:${Math.floor(totalDuration % 3600)}h`,
      sharedSong: sharedSong.length
    })

  }


  useEffect(() => {
    calculateMusicStats()
  }, [musics])


  return (
    <section >
      <h2 className="text-2xl font-bold bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
        Your Music Stats
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-linear-to-br from-gray-800 via-gray-800 to-purple-900/20 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <img src="music.svg" alt="music" className="h-5" />
            </div>
            <span className="text-purple-400 text-sm font-medium">Total</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{musicStats.totalSongs}</div>
          <div className="text-gray-400 text-sm">Songs</div>
        </div>

        <div className="bg-linear-to-br from-gray-800 via-gray-800 to-purple-900/20 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
              <img src="playtime.svg" alt="playtime" className='h-5' />
            </div>
            <span className="text-blue-400 text-sm font-medium">Playtime</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{musicStats.totalDuration}</div>
          <div className="text-gray-400 text-sm">Total Duration</div>
        </div>

        <div className="bg-linear-to-br from-gray-800 via-gray-800 to-purple-900/20 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <img src="share.svg" alt="share" className='h-5' />
            </div>
            <span className="text-green-400 text-sm font-medium">Shared Song</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{musicStats.sharedSong}</div>
          <div className="text-gray-400 text-sm">Total Shared Song</div>
        </div>

      </div>
    </section>

  )
}

export default QuickStats
