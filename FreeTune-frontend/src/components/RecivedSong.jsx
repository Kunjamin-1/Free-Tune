import React from 'react'
import RecivedSongCard from './RecivedSongCard'



const Recivedsong = () => {


  return (
    <div className='bg-gray-900 text-white min-h-screen'>
   
      <div className='max-w-7xl mx-auto px-4 py-6 md:px-6'>
        <div className="mb-8">
          <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Shared Music</h2>
                <p className="text-purple-100 text-sm md:text-base">
                  Discover songs your friends have shared with you
                </p>
              </div>

            </div>
          </div>
        </div>
        <RecivedSongCard />
      </div>
    </div>
  )
}

export default Recivedsong
