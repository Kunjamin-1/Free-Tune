import { useContext, useEffect, useRef, useState } from 'react'
import UpdateProfile from './UpdateProfile'
import DeleteUser from './DeleteUser';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { UserContext } from '../context/user/UserContext';
import { useNavigate } from 'react-router-dom';
import QuickStats from './QuickStats';
import Loader from './Loader';
import { MusicContext } from '../context/music/MusicContext';

const UserProfile = () => {
    const { logoutUser, getUserDetails, addAvatar, deleteAvatar } = useContext(UserContext)
    const { getAllMusic, isSongPlaying, setIsSongPlaying } = useContext(MusicContext)

    const [showForm, setShowForm] = useState(false);
    const [userData, setUserData] = useState({})
    const [showLoader, setShowLoader] = useState(false)
    const [showMainLoader, setShowMainLoader] = useState(false)
    const [uploadAvatar, setUploadAvatar] = useState('')
    const [joinedDate, setJoinedDate] = useState({})
    const deleteRef = useRef(null)
    const uploadNewAvatar = useRef(null)
    const navigate = useNavigate()


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

    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    }

    const fetchUserData = async () => {
        const response = await getUserDetails()
        setUserData(response.body)
        const newDate = new Date(response.body.createdAt)
        setJoinedDate(newDate)
    }


    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            fetchUserData()
        }
        getAllMusic()
    }, [])

    const uploadUserAvatar = () => {
        uploadNewAvatar.current.click()
    }

    const saveNewAvatar = (e) => {
        const newAvatarData = e.target.files[0]
        console.log(newAvatarData)
        setUploadAvatar(newAvatarData)
    }

    const changeAvatar = async () => {

        const newForm = new FormData()

        newForm.set("avatar", uploadAvatar)

        newForm.set("isFormData", true)


        setShowMainLoader(true)
        const response = await addAvatar(newForm)
        setShowMainLoader(false)

        if (response.success) {
            toast.success("avatar Uploaded successfully", toastOptions)
            setTimeout(() => {
                setShowMainLoader(false)
                fetchUserData()
                setUploadAvatar(``)
            }, 5150);
        } else {
            toast.error(response.error, toastOptions)
            setTimeout(() => {
                setShowMainLoader(false)
            }, 5150);
        }
    }

    const cancleAvatar = () => {
        setUploadAvatar({})
    }

    const avatarDelete = async () => {
        setShowMainLoader(true)
        const response = await deleteAvatar(userData?.avatarPublicId)
        if (response.success) {
            toast.success(response.message, toastOptions)
            setTimeout(() => {
                setShowMainLoader(false)
                fetchUserData()
            }, 5150);
        } else {
            toast.error(response.message, toastOptions)
             setTimeout(() => {
                setShowMainLoader(false)
            }, 5150);
        }
    }

    const signOutBtnClicked = async () => {
        setShowLoader(true)
        let response = await logoutUser()
        setShowLoader(false)
        if (isSongPlaying) {
            setIsSongPlaying(false)
        }
        if (response.success) {
            localStorage.removeItem("accessToken")
            document.querySelector("title").innerText = 'FreeTune - Login'
            navigate("/login")
        } else {
            toast.error("User Signout Failed", toastOptions)
        }
    }

    return (
        <div className="bg-gray-900 text-white h-fit">
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
            {showMainLoader && <Loader />}
            {Object.keys(userData).length === 0 ? <Loader /> :
                <main className="max-w-4xl mx-auto px-4 py-8 md:px-8 space-y-6">
                    <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                            <div className='w-26 relative group h-26 border-4 border-purple-500  rounded-full'>
                                <img
                                    src={userData.avatar || "avatar.png"}
                                    alt="User Avatar"
                                    className={`w-24 ${!uploadAvatar ? "group-hover:opacity-35  hover:opacity-35" : "opacity-35"} h-24  cursor-pointer transition rounded-full `}
                                />
                                <div className={`absolute top-10 ${!uploadAvatar ? "group-hover:opacity-100 opacity-0 transition-opacity" : "opacity-100"} left-6  ease-in-out  flex justify-center items-center gap-5`}>
                                    {
                                        !uploadAvatar ? <>
                                            <img src="upload.svg" className='cursor-pointer hover:scale-125 transition ease-out h-4' onClick={uploadUserAvatar} alt="upload" />
                                            <img src="delete.svg"
                                                onClick={avatarDelete}
                                                className='cursor-pointer hover:scale-125 transition ease-out h-4' alt="delete" />
                                        </> : <>
                                            <img src="cancle.svg"
                                                onClick={cancleAvatar} className='cursor-pointer hover:scale-125 transition ease-out h-4' alt="cancle" />
                                            <img src="tick.svg" className='cursor-pointer hover:scale-125 transition 
                                        ease-out h-4'
                                                onClick={changeAvatar}
                                                alt="tick" /></>
                                    }

                                    <input type="file" accept='image/*' ref={uploadNewAvatar} onChange={saveNewAvatar} name="newAvatar" id="newAvatar" className="hidden" />
                                </div>
                            </div>

                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-xl font-bold mb-1">{userData.username || "username"}</h2>
                                <p className="text-purple-400 capitalize mb-2">{userData.fullName || "full name"}</p>
                                <div className="space-y-1 text-gray-400">
                                    <p className="flex gap-1 items-center justify-start">
                                        <img src="e-mail.svg" className='h-4' alt="e-mail" />
                                        {userData.email || "email"}
                                    </p >
                                </div>
                                <div className="space-y-1 text-gray-400">
                                    <p className="flex gap-1 items-center justify-start">
                                        <img src="calendar.svg" className='h-4' alt="e-mail" />
                                        Joined {months[joinedDate.getMonth()]} {joinedDate.getFullYear()}
                                    </p >
                                </div>
                            </div>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="bg-linear-to-r w-44 flex justify-center items-center gap-2 from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-lg font-medium transition-all cursor-pointer">
                                <img src="edit.svg" alt="edit" className="h-4" />
                                {showForm ? "Close Editor" : "Edit Profile"}
                            </button>
                        </div>
                    </section>
                    <section className={`${showForm ? "block" : "hidden"} transition-all duration-500 ease-in-out transform ${showForm
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-10 pointer-events-none"
                        }`}>
                        <UpdateProfile setShowLoader={setShowMainLoader} />
                    </section>

                    <QuickStats />

                    <section className="bg-gray-800 flex flex-col gap-3 rounded-xl p-6">
                        <div className="p-4 bg-red-600/10 border border-red-600/30 rounded-lg">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div>
                                    <div className="font-medium text-red-400">Delete Account</div>
                                    <div className="text-sm text-gray-400">
                                        Permanently delete your account and all data
                                    </div>
                                </div>
                                <button onClick={() => deleteRef.current.click()} className="flex justify-center items-center gap-2 cursor-pointer bg-red-600 hover:bg-red-700 mt-3 sm:mt-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    <img src="delete.svg" alt="delete" className='h-4' />
                                    Delete Account
                                </button>
                            </div>

                        </div>

                        <div className="p-4 bg-blue-600/10  border border-blue-600/30 rounded-lg">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div>
                                    <div className="font-medium text-blue-400">Sign Out</div>
                                    <div className="text-sm text-gray-400">
                                        Log out from your account securely
                                    </div>
                                </div>
                                <button onClick={signOutBtnClicked}
                                    className="flex justify-center items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 mt-3 sm:mt-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    <img src="signout.svg" className="h-4" alt="" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            }
            <DeleteUser deleteRef={deleteRef} />
        </div>

    )
}

export default UserProfile
