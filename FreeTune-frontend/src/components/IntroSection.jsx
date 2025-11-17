import React from 'react'

const IntroSection = () => {
    
    return (
        <div className='w-11/12 mx-4 px-4 py-8 gap-4 bg-linear-to-br from-gray-800 via-gray-800 to-purple-800/30 rounded-2xl flex justify-center items-center flex-col'>
            <div className="w-14 h-14 bg-linear-to-r  border-purple-500/20 from-purple-600 to-blue-600 rounded-xl flex items-center justify-center " >
                <img src="cloud-arrow-up.svg" alt="cloud-arrow-up" />
            </div>
            <h1 className="text-4xl capitalize mt-3 text-center font-bold">your personal music universe</h1>

            <p className='max-w-2xl text-center leading-6 tracking-wider text-[#9CA3AF]'>Upload, organize, and stream your favorite music collection in one secure place.<span className='text-[#C084FC]'>Experience your music like never before</span> with FreeTune's intuitive interface.</p>

            <ul className='list-none mt-4 capitalize flex justify-center items-center gap-8 text-[14px]'>
                <li className='flex justify-center items-center gap-1.5 text-[#10B981]'>
                    
                    <img src="green-tick.svg" alt="green-tick" />
                    <span>secure storage</span>
                </li>
                <li className='flex justify-center items-center gap-1.5 text-[#3B82F6]'>
                    <img src="blue-tick.svg" alt="blue-tick" />
                    <span>easy upload</span>
                </li>
                <li className='flex justify-center items-center gap-1.5 text-[#C084FC]'>
                    <img src="purple-tick.svg" alt="purple-tick" />
                    <span>instant streaming</span>
                </li>
            </ul>
        </div>
    )
}

export default IntroSection
