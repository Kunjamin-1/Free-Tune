import { useState, useContext } from "react";
import { UserContext } from "../context/user/UserContext"
import { ToastContainer, toast, Slide } from 'react-toastify';
import { MusicContext } from "../context/music/MusicContext";

const UpdateProfile = ({setShowLoader}) => {
  const [newUserData, setNewUserData] = useState({ username: "", fullName: "", email: "" })

  const { getUserDetails, updateUser } = useContext(UserContext)
  const { isSongPlaying, setIsSongPlaying } = useContext(MusicContext)


  const inputChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value })
  }

  const resetNewData = () => {
    setNewUserData({ username: "", fullName: "", email: "" })
  }

  const submitNewData = async (e) => {
    e.preventDefault()

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

    let newData = {}
    if (newUserData.username) {
      newData.username = (newUserData.username).trim()
    }
    if (newUserData.fullName) {
      newData.fullName = (newUserData.fullName).trim()
    }
    if (newUserData.email) {
      newData.email = (newUserData.email).trim()
    }
    if (isSongPlaying) {
      setIsSongPlaying(false)
    }

    const response = await updateUser(newData)
  
    if (response.success) {
      setShowLoader(true)
      toast.success("Detail Updated Successfully", toastOptions)
      setTimeout(() => {
        setShowLoader(false)
        getUserDetails()
      }, 5150);
    } else {
      toast.error(response.message, toastOptions)
      setTimeout(() => {
        setShowLoader(false)
      }, 5150);
    }
  }

  return (
    <div className="relative">
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
        className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}
      >
        <h3 className="text-xl flex font-bold mb-6 text-purple-400">
          Update Profile
        </h3>

        <form onSubmit={submitNewData} method="post" className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <input
                onChange={inputChange}
                type="text"
                value={newUserData.username}
                placeholder="Enter the username"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                name="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <input
                onChange={inputChange}
                name="fullName"
                type="text"
                value={newUserData.fullName}
                placeholder="Enter the full name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <input
                onChange={inputChange}
                type="email"
                value={newUserData.email}
                placeholder="Enter the email address"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                name="email"
              />
            </div>
          </div>
        
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-700">
            <button
              type="submit"
              className="flex gap-2 flex-1 justify-center items-center cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              <img src="save.svg" alt="save" className="h-4" />Save Changes
            </button>
            <button
              onClick={resetNewData}
              type="button"
              className="flex flex-1 justify-center items-center gap-2 cursor-pointer bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <img src="reset.svg" alt="reset" className="h-4" />Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile