import { useContext, useEffect } from "react";
import IntroSection from "./IntroSection";
import { MusicContext } from "../context/music/MusicContext";
import HomeLibrary from "./HomeLibrary";
import QuickStats from "./QuickStats";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMusicThunk } from "../features/music/musicThunk";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {success,allMusicData,loading} = useSelector((state) => state.music);
  const { musics, getAllMusic } = useContext(MusicContext);

  const fetchAllMusics = async () => {
    const { success } = await dispatch(getAllMusicThunk()).unwrap();

    if (!success) {
      navigate("/login");
      localStorage.removeItem("accessToken");
      document.querySelector("title").innerText = "FreeTune - Login";
    }
  };

  useEffect(() => {

    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      document.querySelector("title").innerText = "FreeTune - Login";
    }

    if (allMusicData.length === 0) {
      fetchAllMusics();
    }
  }, []);

  return (
    <div
      className={`min-w-full gap-5  mt-10 flex items-center flex-col ${allMusicData.length !== 0 && "justify-center min-h-screen"} `}
    >
      <IntroSection />
      <div className="w-11/12">
        <QuickStats />
      </div>
      {allMusicData.length !== 0 && <HomeLibrary />}
    </div>
  );
};

export default Home;
