import React, { useContext, useEffect } from 'react';
import { MusicContext } from '../context/music/MusicContext';
import VolumeControl from './VolumeControl';

const MusicPlayer = () => {
  const { musics, isSongPlaying, currentSong, playSongRef, songProgress, setIsSongPlaying, setSongProgress, setCurrentSong } = useContext(MusicContext);

  useEffect(() => {
    const audio = playSongRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const progress = (audio.currentTime / audio.duration) * 100 || 0;
      setSongProgress(progress);
    };

    const handleLoaded = () => {
      if (isSongPlaying) {
        audio.play().catch(console.warn);
      }
    };

    const handleEnded = () => {
      setIsSongPlaying(false);
      setSongProgress(0);
    };

    if (currentSong?.audioFile) {
      if (audio.src !== currentSong.audioFile) {
        audio.src = currentSong.audioFile;
        audio.load();
      }

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoaded);
      audio.addEventListener('ended', handleEnded);

      if (isSongPlaying) {
        audio.play().catch(console.warn);
        setSongProgress(0)
      } else {
        audio.pause();
      }
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, isSongPlaying]);

  const togglePlayPause = () => {
    const audio = playSongRef.current;
    if (!audio) return;
    if (isSongPlaying) {
      audio.pause();
      setIsSongPlaying(false);

    } else {
      audio.play().then(() => setIsSongPlaying(true)).catch(console.error);
    }
  };

  const playPreviousSong = () => {
    let currentSongIndex = musics.indexOf(currentSong)

    if (currentSongIndex === 0) {
      setCurrentSong(musics[musics.length - 1])
    } else {
      setCurrentSong(musics[currentSongIndex - 1])
    }
    setSongProgress(0)
  }
  const playNextSong = () => {

    let currentSongIndex = musics.indexOf(currentSong)
    if ((musics.length - 1) === currentSongIndex) {
      setCurrentSong(musics[0])
    } else {
      setCurrentSong(musics[currentSongIndex + 1])
    }
    setSongProgress(0)

  }

  return (
    <footer>
      <div
        className={`bg-[#1F2937] fixed  ${isSongPlaying ? 'flex' : 'hidden'} bottom-0 h-20 w-full  transition-all ease-out sm:px-3 md:px-20 justify-between px-5 sm:justify-between items-center`}
      >
        <div className=" flex justify-center items-center gap-1.5">
          <img
            className="h-12 w-12 rounded bg-contain bg-center"
            src={currentSong.thumbnail || "thumbnail.jfif"}
            alt={currentSong.title}
          />
          <div className="capitalize">
            <p>{currentSong.title}</p>
            <p className="text-[#9CA3AF] text-xs">{currentSong.artistName}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 sm:gap-4 md:gap-5">
          <img
            onClick={playPreviousSong}
            className="cursor-pointer h-5 md:h-4 opacity-45 hover:opacity-100 hover:scale-125 transition-all ease-in "
            src="previous.svg"
            alt="previous"
          />
          <div
            onClick={togglePlayPause}
            className="bg-purple-600 cursor-pointer text-white p-4 md:p-3 rounded-full hover:scale-125 transition-all ease-in"
          >
            <img
              src={`${!isSongPlaying ? 'play' : 'pause'}.svg`}
              alt={`${!isSongPlaying ? 'play' : 'pause'}`}
              className="h-5 md:h-4"
            />
          </div>
          <img
            onClick={playNextSong}
            className="cursor-pointer opacity-45 hover:opacity-100 hover:scale-125 transition-all h-5 md:h-4 ease-in"
            src="next.svg"
            alt="next"
          />
        </div>

        <div className="hidden sm:flex justify-center items-center gap-1.5">
          <VolumeControl audioRef={playSongRef} />
        </div>

        <audio ref={playSongRef} preload="auto" />
      </div>

      {/* Progress bar */}
      {isSongPlaying && <div className={`h-1 rounded-full ${songProgress === 0 ? 'hidden' : 'block'} fixed bottom-20 bg-purple-500`} style={{ width: `${songProgress}%` }}></div>}

      {/* Progress circle */}
      {isSongPlaying && <div
        className={`h-3.5 w-3.5 ${songProgress === 0 ? 'hidden' : 'block'} rounded-full z-10 bg-purple-600 fixed bottom-18.5`}
        style={{ left: `${songProgress}%` }}
      ></div>}
    </footer>
  );
};

export default MusicPlayer;
