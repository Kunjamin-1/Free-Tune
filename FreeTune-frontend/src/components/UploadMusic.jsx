import { useRef, useState, useContext } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { MusicContext } from "../context/music/MusicContext";
import Loader from "./Loader";

const UploadMusic = () => {

  const audioRef = useRef(null)
  const imageRef = useRef(null)

  const [tempFormData, setTempFormData] = useState({})
  const [showLoader, setShowLoader] = useState(false)
  const { uploadMusic } = useContext(MusicContext)

  const handleAudioClick = () => {
    audioRef.current.click()
  }
  const handleImageClick = () => {
    imageRef.current.click()
  }
  const submitAudio = (e) => {
    const audioFile = e.target.files[0]
  
    setTempFormData({ ...tempFormData, audioFile })

  }
  const submitThumbnail = (e) => {
    const thumbnail = e.target.files[0]
    setTempFormData({ ...tempFormData, thumbnail })
  }
  const onInputChange = (e) => {
    setTempFormData({ ...tempFormData, [e.target.name]: e.target.value })

  }


  const uploadSong = async () => {

    let formData = new FormData()

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

    if (!tempFormData.audioFile) {
      toast.error('Audio file is required', toastOptions);
      throw new Error("Audio file is required")
    } else {
      formData.set("audioFile", tempFormData.audioFile)
    }

    if (!tempFormData.title) {
      toast.error('audio title is required', toastOptions);
      throw new Error("audio title is required")
    }

    if (!/^[A-Za-z\s]+$/.test(tempFormData.title)) {
      toast.error('Only alphabets allowed in title', toastOptions);
      throw new Error("only alphabets are allowed in title")
    }

    if (tempFormData.title) {
      formData.set("title", (tempFormData.title).trim())
    }

    if(tempFormData.thumbnail){
      formData.set("thumbnail", tempFormData.thumbnail)
    }

    if (!/^[A-Za-z\s]+$/.test(tempFormData.artistName)) {
      toast.error('Only alphabets allowed in Artist Name', toastOptions);
      throw new Error("only alphabets are allowed in artist name")
    } else {
      formData.set("artistName", (tempFormData.artistName).trim())
    }


    setShowLoader(true)
    const response = await uploadMusic(formData)
    setShowLoader(false)
    if (response.success) {
      toast.success(response.message, toastOptions);
      setTempFormData({})
    }else{
      toast.error(response.message, toastOptions);
    }
  }

  return (
    <main className="px-4 py-8 relative z-10">
      {showLoader && <Loader/>}
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-linear-to-br from-gray-800 via-gray-800 to-gray-700 rounded-xl border border-gray-700 overflow-hidden slide-in hover:border-purple-500/50 transition-all duration-500 relative"> 
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/5 via-blue-600/5 to-green-500/5 gradient-shift pointer-events-none"></div>
          <div className="p-6 sm:p-8 relative z-10">

            <div className="mb-8">
              <label className="block text-sm font-medium bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent mb-4">
                Audio File *
              </label>
              <div onClick={handleAudioClick} className={`border-2 border-dashed ${!tempFormData.audioFile ? "hover:border-purple-500 bg-linear-to-br from-white/10 via-purple-600/5 to-blue-600/5 border-gray-600" : "border-[#10B981]"} rounded-xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer  ${!tempFormData.audioFile ? "hover:scale-[1.02]" : ""} relative overflow-hidden`}>
                <div className={`absolute inset-0 gradient-triple group-hover:opacity-10 opacity-0  transition-opacity duration-500 gradient-shift`}></div>
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${!tempFormData.audioFile ? "bg-linear-to-br from-gray-700 to-gray-600  group-hover:from-purple-600 group-hover:to-blue-600" : "bg-[#42ef97e6]"} transition-all duration-300 ${!tempFormData.audioFile ? "group-hover:scale-110" : ""}float-animation relative overflow-hidden`}>
                  <div className={`absolute inset-0 opacity-0 ${tempFormData.audioFile ? "bg-linear-to-r from-white/20 to-transparent group-hover:opacity-100" : "bg-[#42ef97e6]"}  transition-opacity duration-300 gradient-shift`}></div>
                  <img src="cloud-arrow-up.svg" className={`${tempFormData.audioFile ? "hidden" : ""} text-purple-400 group-hover:text-white text-2xl transition-colors duration-300 relative z-10`} />
                  <img src="check.svg" alt="check" className={`${!tempFormData.audioFile && "hidden"}`} />
                </div>
                <h3 className="text-lg font-semibold bg-linear-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent mb-2 group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
                  {!tempFormData.audioFile ? "Drop your music file here" : `${tempFormData.audioFile.name} saved as draft successfully`}
                </h3>
                <p className={` ${tempFormData.audioFile ? "hidden" : ''} text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300`}>
                  or click to browse files
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                  {!tempFormData.audioFile && ["MP3", "WAV", "FLAC", "M4A"].map((type) => (
                    <span
                      key={type}
                      className="bg-linear-to-r from-gray-700 to-gray-600 px-2 py-1 rounded hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <input type="file" required className="hidden" accept="audio/*" onChange={submitAudio} ref={audioRef} />
              </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="space-y-6">

                <div className="slide-in">
                  <label className="block text-sm font-medium bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent mb-2">
                    Track Title *
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-shift"></div>
                    <input
                      type="text"
                      placeholder="Enter track title"
                      className="w-full px-4 py-3 bg-linear-to-r from-gray-700 to-gray-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:scale-[1.02] relative z-10"
                      name="title"
                      onChange={onInputChange}
                    />
                  </div>
                </div>


                <div className="slide-in">
                  <label className="block text-sm font-medium bg-linear-to-r from-white to-blue-300 bg-clip-text text-transparent mb-2">
                    Artist Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-shift"></div>
                    <input
                      type="text"
                      placeholder="Enter artist name"
                      className="w-full px-4 py-3 bg-linear-to-r from-gray-700 to-gray-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:scale-[1.02] relative z-10"
                      name="artistName"
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>


              <div className="space-y-6">
                <div className="slide-in">
                  <label className="block text-sm font-medium bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent mb-2">
                    Cover Image
                  </label>
                  <div onClick={handleImageClick} className={`border-2 border-dashed ${!tempFormData.thumbnail ? "bg-linear-to-br from-gray-700 via-purple-600/5 to-blue-600/5 hover:from-gray-600 hover:border-purple-500 hover:scale-105 hover:via-purple-600/10 hover:to-blue-600/10 border-gray-600" : "border-[#10B981]"}  rounded-lg p-6 text-center transition-all duration-300 cursor-pointer group relative overflow-hidden`}>
                    <div className="absolute inset-0 gradient-purple-blue opacity-0 group-hover:opacity-10 transition-opacity duration-500 gradient-shift"></div>
                    <div className={`mx-auto w-12 h-12 ${!tempFormData.thumbnail ? "bg-linear-to-br from-gray-600 to-gray-500 group-hover:from-purple-600 group-hover:to-blue-600 group-hover:scale-110" : "bg-[#42ef97e6]"} rounded-lg flex items-center justify-center mb-3  transition-all duration-300  relative overflow-hidden`}>
                      <div className={`absolute inset-0 ${!tempFormData.thumbnail ? "bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100" : ""} transition-opacity duration-300 gradient-shift`}></div>
                      <img src="image.svg" className={`${tempFormData.thumbnail ? "hidden" : ""} text-purple-400 group-hover:text-white text-xl transition-colors duration-300 relative z-10`} />
                      <img src="check.svg" alt="check" className={`${!tempFormData.thumbnail && "hidden"}`} />
                    </div>
                    <p className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">
                      {!tempFormData.thumbnail ? "Upload cover image" : "Cover Image saved as draft successfully"}
                    </p>
                    <p className={`text-xs  ${tempFormData.thumbnail && "hidden"} text-gray-500 group-hover:text-gray-400 transition-colors duration-300`}>
                      JPG, PNG (min 500x500px)
                    </p>
                    <input type="file" className="hidden" accept="image/*" onChange={submitThumbnail} ref={imageRef} />
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-col sm:flex-row justify-end slide-in">

              <button onClick={uploadSong} className="px-8 py-3 gradient-purple-blue text-white rounded-lg cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-medium pulse-glow hover:shadow-2xl relative overflow-hidden gradient-shift">
                <div className="absolute inset-0 bg-linear-to-tl from-purple-500 to-blue-600  gradient-shift"></div>
                <span className="relative z-10">
                  <i className="fas fa-upload mr-2"></i> Upload Track
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};



export default UploadMusic;
