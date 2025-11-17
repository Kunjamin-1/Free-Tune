import React, { useContext, useState } from 'react'
import { MusicContext } from '../context/music/MusicContext';
import { UserContext } from '../context/user/UserContext';

const ShareSong = ({ musicId }) => {

    const [username, setUsername] = useState('')
    const [showResponse, setShowResponse] = useState('')
    const [userFreindDetails, setUserFreindDetails] = useState({})
    const { getUserFriendDetail } = useContext(UserContext)
    const { shareMusic } = useContext(MusicContext)

    const inputChange = (e) => {
        setUsername(e.target.value)
    }

    const findUserFriend = async () => {


        const response = await getUserFriendDetail(username.trim())
    

        if (response.success) {
            setUserFreindDetails(response.body)
        } else {
            setShowResponse(response.message)
        }
    }

    const shareSong = async () => {

        const response = await shareMusic(username.trim(), musicId)
    

        if (response.success) {
            setShowResponse(response.message)
        } else {
            setShowResponse(response.message)
        }
    }

    return (
        <div className={`bg-gray-800 z-10 border min-h-12 relative border-gray-700 rounded-xl px-2  py-4 ${Object.keys(userFreindDetails).length !== 0 && "top-20"}   mx-auto flex flex-col gap-4`}>

            {/* Input + Send */}
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden border border-gray-700 focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                <input
                    type="text"
                    value={username}
                    onChange={inputChange}
                    placeholder="Enter username..."
                    className="flex-1 bg-transparent px-3 w-52 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                />
                <button onClick={findUserFriend} className="bg-linear-to-r  from-purple-600 to-blue-600 px-4 py-2 text-white text-sm font-medium hover:from-purple-500 cursor-pointer hover:to-blue-500 transition-colors">
                    Find
                </button>
            </div>

            <div className={` items-center ${Object.keys(userFreindDetails).length !== 0 ? "flex" : "hidden"} justify-between w-full max-w-md  rounded-2xl py-3`}>

                {/* Left section — avatar + info */}
                <div className="flex items-center gap-3">
                    <img
                        src={userFreindDetails.avatar || "avatar.png"}
                        alt={"username"}
                        className="w-10 h-10 object-cover rounded-full border-2 border-purple-500/40"
                    />
                    <div className="flex flex-col">
                        <h3 className="text-white font-semibold capitalize text-sm tracking-wide">
                            {userFreindDetails.fullName || "Unknown User"}
                        </h3>
                        <p className="text-gray-400 text-sm ">@{userFreindDetails.username}</p>
                    </div>
                </div>

                {/* Right section — share button */}
                <button
                    onClick={shareSong}
                    className="flex items-center gap-1 cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg  transition-all ease-in-out shadow-lg hover:shadow-purple-600/30"
                >
                    <img src="share.svg" alt="share" className="w-3 h-3" />
                    Share
                </button>
            </div>
            <p className={showResponse ? "block capitalize" : "hidden"}>{showResponse}</p>
        </div>
    )
}

export default ShareSong
