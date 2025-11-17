
import { MusicContext } from './MusicContext'
import { fetchFunction } from "../../fetchFunction.js"
import { useState, useRef } from 'react'


const MusicState = (props) => {

    const [musics, setMusics] = useState([])
    const [allSharedSongs, setAllSharedSongs] = useState([])
    const [isSongPlaying, setIsSongPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState({})
    const [songProgress, setSongProgress] = useState(0)
    const playSongRef = useRef(null)
    
    const getAllMusic = async () => {
        const getAllMusicResponse = await fetchFunction("music/getAllMusic")

        setMusics(getAllMusicResponse.body)

        return getAllMusicResponse.body
    }

    const uploadMusic = async (data) => {
        const uploadMusicResponse = await fetchFunction("music/uploadMusic", "POST", data)

        setMusics(musics.concat(data))

        return uploadMusicResponse
    }

    const shareMusic = async (username, musicId) => {
        const shareMusicResponse = await fetchFunction(`music/shareMusic/${musicId}`, "POST", { username })

        return shareMusicResponse
    }

    const getAllSharedMusic = async () => {
        const getAllSharedMusicResponse = await fetchFunction(`music/getAllSharedMusic/`, "GET")
        setAllSharedSongs(getAllSharedMusicResponse.body)

        return getAllSharedMusicResponse
    }

    const addSharedMusic = async ({ sharedMusicId, title, audioFileLink, artistName, thumbnailLink, duration }) => {
        const addSharedMusicResponse = await fetchFunction("music/addSharedMusic", "POST", { sharedMusicId, title, audioFileLink, artistName, thumbnailLink, duration })

        return addSharedMusicResponse
    }

    const removeSharedMusic = async (sharedMusicId) => {
        const removeSharedMusicResponse = await fetchFunction(`music/removeSharedMusic/${sharedMusicId}`, "DELETE")

        return removeSharedMusicResponse
    }

    const deleteMusic = async (musicId) => {
        const deleteMusicResponse = await fetchFunction(`music/deleteMusic/${musicId}`, "DELETE")

        return deleteMusicResponse
    }

    return (
        <MusicContext.Provider value={{ musics, allSharedSongs, isSongPlaying, currentSong, playSongRef,songProgress, setSongProgress, setCurrentSong, setIsSongPlaying, uploadMusic, getAllMusic, shareMusic, getAllSharedMusic, addSharedMusic, removeSharedMusic, deleteMusic }}>
            {props.children}
        </MusicContext.Provider>
    )
}

export default MusicState
