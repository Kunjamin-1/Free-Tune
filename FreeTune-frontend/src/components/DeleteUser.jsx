import { useContext, useState } from "react";
import { UserContext } from "../context/user/UserContext";
import { MusicContext } from "../context/music/MusicContext";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const DeleteUser = ({ deleteRef }) => {
  const [deleteBtnClick, setDeleteBtnClick] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [tempDetails, setTempDetails] = useState({})
  const [showLoader, setShowLoader] = useState(false)
  const { deleteUser } = useContext(UserContext)
  const { isSongPlaying, setIsSongPlaying } = useContext(MusicContext)
  const navigate = useNavigate()

  const detailToDeleteAccount = (e) => {
    setTempDetails({ ...tempDetails, [e.target.name]: e.target.value })
  }

  const cancelBtnClick = () => {
    setTempDetails({})
    setDeleteBtnClick(false)
  }

  const deleteAccount = async () => {
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

    if (!tempDetails.username) {
      toast.error('username is required', toastOptions);
      throw new Error("username is required")
    }

    if (!tempDetails.password) {
      toast.error('password is required', toastOptions);
      throw new Error("password is required")
    }
    if (!tempDetails.confirmPassword) {
      toast.error('confirm password is required', toastOptions);
      throw new Error("confirm password is required")
    }
    if (tempDetails.password !== tempDetails.confirmPassword) {
      toast.error('confirm password did not match', toastOptions);
      throw new Error("confirm password did not match")
    }

    if (isSongPlaying) {
      setIsSongPlaying(!isSongPlaying)
    }

    let { username, password } = tempDetails

    setShowLoader(true)
    const response = await deleteUser(
      username.trim(),
      password.trim()
    )
    setShowLoader(false)
    if (response.success) {
      toast.success("Account Deleted Successfully", toastOptions)
      localStorage.removeItem("accessToken")
      navigate("/signup")

    } else {
      toast.error(response.message, toastOptions)
    }

  }


  return (
    <div className={`items-center ${deleteBtnClick ? "flex" : "hidden"} justify-center min-h-fit bg-gray-900`}>
      {showLoader && <Loader />}
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
      {/* Modal Trigger */}
      <label
        ref={deleteRef}
        htmlFor="modal-toggle"
        onClick={() => setDeleteBtnClick(!deleteBtnClick)}
        className="cursor-pointer hidden bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
      >
        Open Modal
      </label>

      {/* Hidden Checkbox (Toggle Mechanism) */}
      <input type="checkbox" id="modal-toggle" className="hidden peer" />

      {/* Overlay */}
      <label
        htmlFor="modal-toggle"
        className={`fixed inset-0 bg-black/50  ${deleteBtnClick ? "block" : "hidden"} transition-opacity duration-300`}
      ></label>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className={`items-center ${deleteBtnClick ? "flex pointer-events-auto" : "hidden"} justify-center w-full px-4`}>
          <div className={`bg-gray-800 rounded-2xl shadow-xl border border-gray-700 w-full max-w-md transform transition-all duration-300 scale-95 ${deleteBtnClick && "scale-100"}`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
              <h2 className="text-xl font-bold  text-red-600">Delete Account</h2>
              <label
                htmlFor="modal-toggle"
                className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors"
              >
                <i className="fas fa-times"></i>
              </label>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">

              <p className="text-gray-400 text-sm">
                <span className="capitalize text-[18px] font-semibold text-orange-500">warning:</span>
                <span className="ml-1">Once your account is deleted, it cannot be restored.</span>
              </p>


              <div>
                <label className="block text-sm capitalize text-gray-400 mb-1">username *</label>
                <input
                  type="text"
                  name="username"
                  onChange={detailToDeleteAccount}
                  className="w-full bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>

              <div className="relative">
                <label className="block capitalize text-sm text-gray-400 mb-1">password *</label>
                <input
                  onChange={detailToDeleteAccount}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter your password"
                />
                <img onClick={() => setShowPassword(!showPassword)} src={`${showPassword ? "eye" : "eye-slash"}.svg`} className="absolute h-4 right-6 top-9 cursor-pointer" alt={showPassword ? "text" : "password"} />
              </div>
              <div className="relative">
                <label className="block capitalize text-sm text-gray-400 mb-1">confirm password *</label>
                <input
                  onChange={detailToDeleteAccount}
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Confirm your password"
                />
                <img onClick={() => setShowConfirmPassword(!showConfirmPassword)} src={`${showConfirmPassword ? "eye" : "eye-slash"}.svg`} className="absolute h-4 right-6 top-9 cursor-pointer" alt={showConfirmPassword ? "eye" : "eye-slash"} />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 border-t border-gray-700 px-6 py-4">
              <label
                onClick={cancelBtnClick}
                htmlFor="modal-toggle"
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </label>
              <button onClick={deleteAccount} className="bg-red-600 cursor-pointer hover:opacity-90 px-4 py-2 rounded-lg text-white font-medium transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser