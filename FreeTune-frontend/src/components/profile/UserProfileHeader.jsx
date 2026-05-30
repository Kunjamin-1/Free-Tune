import React from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";

const UserProfileHeader = ({
  userData,
  uploadAvatar,
  uploadUserAvatar,
  avatarDelete,
  cancleAvatar,
  changeAvatar,
  uploadNewAvatar,
  joinedDate,
  showForm,
  setShowForm,
  saveNewAvatar
}) => {

  

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
    11: "December",
  };

  return (
    <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-26 relative group h-26 border-4 border-purple-500  rounded-full">
          <img
            src={userData.avatar || "avatar.png"}
            alt="User Avatar"
            className={`w-24 ${!uploadAvatar ? "group-hover:opacity-35  hover:opacity-35" : "opacity-35"} h-24  cursor-pointer transition rounded-full `}
          />
          <div
            className={`absolute top-10 ${!uploadAvatar ? "group-hover:opacity-100 opacity-0 transition-opacity" : "opacity-100"} left-6  ease-in-out  flex justify-center items-center gap-5`}
          >
            {!uploadAvatar ? (
              <>
                <img
                  src="upload.svg"
                  className="cursor-pointer hover:scale-125 transition ease-out h-4"
                  onClick={uploadUserAvatar}
                  alt="upload"
                />
                <img
                  src="delete.svg"
                  onClick={avatarDelete}
                  className="cursor-pointer hover:scale-125 transition ease-out h-4"
                  alt="delete"
                />
              </>
            ) : (
              <>
                <img
                  src="cancle.svg"
                  onClick={cancleAvatar}
                  className="cursor-pointer hover:scale-125 transition ease-out h-4"
                  alt="cancle"
                />
                <img
                  src="tick.svg"
                  className="cursor-pointer hover:scale-125 transition 
                                        ease-out h-4"
                  onClick={changeAvatar}
                  alt="tick"
                />
              </>
            )}

            <input
              type="file"
              accept="image/*"
              ref={uploadNewAvatar}
              onChange={saveNewAvatar}
              name="newAvatar"
              id="newAvatar"
              className="hidden"
            />
          </div>
        </div>

        <div className="text-center md:text-left flex-1">
          <h2 className="text-xl font-bold mb-1">
            {userData.username || "username"}
          </h2>
          <p className="text-purple-400 capitalize mb-2">
            {userData.fullName || "full name"}
          </p>
          <div className="space-y-1 text-gray-400">
            <p className="flex gap-1 items-center justify-start">
              <img src="e-mail.svg" className="h-4" alt="e-mail" />
              {userData.email || "email"}
            </p>
          </div>
          <div className="space-y-1 text-gray-400">
            <p className="flex gap-1 items-center justify-start">
              <img src="calendar.svg" className="h-4" alt="e-mail" />
              Joined {months[joinedDate.getMonth()]} {joinedDate.getFullYear()}
            </p>
          </div>
        </div>
        <Button
          buttonFunction={() => setShowForm(!showForm)}
          buttonStyle="bg-linear-to-r w-44 flex justify-center items-center gap-2 from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-lg font-medium transition-all cursor-pointer"
          svgSrc={"/edit.svg"}
          svgAlt={"edit"}
        >
          {showForm ? "Close Editor" : "Edit Profile"}
        </Button>
      </div>
    </section>
  );
};

export default UserProfileHeader;
