import { useContext, useEffect } from 'react'
import IntroSection from './IntroSection'
import { MusicContext } from "../context/music/MusicContext";
import HomeLibrary from './HomeLibrary'
import QuickStats from './QuickStats';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const { musics, getAllMusic } = useContext(MusicContext)

  useEffect(() => {
    if (musics.length === 0) getAllMusic();
    if (!localStorage.getItem("accessToken")) {
      navigate("/login")
      document.querySelector("title").innerText = 'FreeTune - Login'
    }
  }, [])

  return (

    <div className={`min-w-full gap-5  mt-10 flex items-center flex-col ${musics.length !== 0 && "justify-center min-h-screen"} `}>
      <IntroSection />
      <div className='w-11/12'>
        <QuickStats />
      </div>
      {musics.length !== 0 && <HomeLibrary />}

    </div>
  )
}

export default Home
