import { useContext, useEffect, useRef, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import DeleteProfile from "./DeleteProfile";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import QuickStats from "../QuickStats";
import Loader from "../Loader";
import { UserContext } from "../../context/user/UserContext";
import { MusicContext } from "../../context/music/MusicContext";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAvatarThunk, getUserDetailsThunk, logoutUserThunk } from "../../features/auth/authThunk";
import UserProfileHeader from "./UserProfileHeader";

const UserProfile = () => {
  const { logoutUser, getUserDetails, addAvatar, deleteAvatar } =
    useContext(UserContext);
  const { getAllMusic, isSongPlaying, setIsSongPlaying } =
    useContext(MusicContext);

  const { allMusicData } = useSelector((state) => state.music);

  const { userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [dataOfUser,setDataOfUser] = useState({})
  const [showLoader, setShowLoader] = useState(false);
  const [showMainLoader, setShowMainLoader] = useState(false);
  const [uploadAvatar, setUploadAvatar] = useState("");
  const [joinedDate, setJoinedDate] = useState({});
  const deleteRef = useRef(null);
  const uploadNewAvatar = useRef(null);
  const navigate = useNavigate();

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
  };

  const fetchUserData = async () => {
    if (!userData) {
      const response = await dispatch(getUserDetailsThunk()).unwrap();
      setDataOfUser(response.body);
      const newDate = new Date(response.body.createdAt);
      setJoinedDate(newDate);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUserData();
    }
    if (allMusicData.length === 0) {
      getAllMusic();
    }
  }, []);

  const uploadUserAvatar = () => {
    uploadNewAvatar.current.click();
  };

  const saveNewAvatar = (e) => {
    const newAvatarData = e.target.files[0];
    console.log(newAvatarData);
    setUploadAvatar(newAvatarData);
  };

  const changeAvatar = async () => {
    const newForm = new FormData();

    newForm.set("avatar", uploadAvatar);

    newForm.set("isFormData", true);

    setShowMainLoader(true);
    const response = await dispatch(addAvatarThunk(newForm)).unwrap();
    setShowMainLoader(false);

    if (response.success) {
      toast.success("avatar Uploaded successfully", toastOptions);
      setTimeout(() => {
        setShowMainLoader(false);
        fetchUserData();
        setUploadAvatar(``);
      }, 5150);
    } else {
      toast.error(response.error, toastOptions);
      setTimeout(() => {
        setShowMainLoader(false);
      }, 5150);
    }
  };

  const cancleAvatar = () => {
    setUploadAvatar({});
  };

  const avatarDelete = async () => {
    setShowMainLoader(true);
    const response = await dispatch(deleteAvatar(userData?.avatarPublicId)).unwrap();
    if (response.success) {
      toast.success(response.message, toastOptions);
      setTimeout(() => {
        setShowMainLoader(false);
        fetchUserData();
      }, 5150);
    } else {
      toast.error(response.message, toastOptions);
      setTimeout(() => {
        setShowMainLoader(false);
      }, 5150);
    }
  };

  const signOutBtnClicked = async () => {
    setShowLoader(true);
    let response = await dispatch(logoutUserThunk()).unwrap();
    setShowLoader(false);
    if (isSongPlaying) {
      setIsSongPlaying(false);
    }
    if (response.success) { 
      localStorage.removeItem("accessToken");
      document.querySelector("title").innerText = "FreeTune - Login";
      navigate("/login");
    } else {
      toast.error("User Signout Failed", toastOptions);
    }
  };

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

      {Object.keys(dataOfUser).length === 0 ? (
        <Loader />
      ) : (
        <main className="max-w-4xl mx-auto px-4 py-8 md:px-8 space-y-6">
          
          <UserProfileHeader

           userData={dataOfUser}
            uploadAvatar={uploadAvatar}
            uploadUserAvatar={uploadUserAvatar}
            avatarDelete={avatarDelete}
            cancleAvatar={cancleAvatar}
            changeAvatar={changeAvatar}
            uploadNewAvatar={uploadNewAvatar}
            showForm={showForm}
            joinedDate={joinedDate}
            setShowForm={setShowForm}
            saveNewAvatar={saveNewAvatar}
           />

          <section
            className={`${showForm ? "block" : "hidden"} transition-all duration-500 ease-in-out transform ${
              showForm
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
          >

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
                <Button
                  buttonFunction={() => deleteRef.current.click()}
                  buttonStyle="bg-red-600 hover:bg-red-700 mt-3 gap-2 sm:mt-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  svgSrc="/delete.svg"
                  svgAlt="delete"
                >
                  Delete Account
                </Button>
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
                <Button
                  buttonFunction={signOutBtnClicked}
                  buttonStyle={
                    "flex justify-center items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 mt-3 sm:mt-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  }
                  svgSrc="/signout.svg"
                  svgAlt="signout"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </section>
        </main>
      )}
      <DeleteProfile deleteRef={deleteRef} />
    </div>
  );
};

export default UserProfile;
