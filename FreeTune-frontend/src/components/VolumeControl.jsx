import {useRef,useState} from 'react'

const VolumeControl = ({ audioRef }) => {
  const barRef = useRef(null);
  const [volume, setVolume] = useState(1); // 1 = 100%

  // 🧠 Helper to update both UI and audio
  const updateVolume = (clientX) => {
    const rect = barRef.current.getBoundingClientRect();
    
    let newVolume = (clientX - rect.left) / rect.width;
    newVolume = Math.min(Math.max(newVolume, 0), 1); // clamp 0–1

    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMouseDown = (e) => {
    updateVolume(e.clientX);

    const handleMouseMove = (moveEvent) => updateVolume(moveEvent.clientX);
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex items-center gap-1.5">
      <img
        src="volume.svg"
        alt="volume"
        className="opacity-45 select-none pointer-events-none"
      />
      <div
        ref={barRef}
        onMouseDown={handleMouseDown}
        className="relative w-32 bg-[#374151] rounded-full h-1 cursor-pointer"
      >
        <div
          className="absolute bg-[#9333ea] h-1 rounded-full top-0 left-0"
          style={{ width: `${volume * 100}%` }}
        />
        <div
          className="absolute bg-[#9333ea] h-3 w-3 rounded-full top-2 -translate-y-1/2"
          style={{ left: `${volume * 100}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  );
};



export default VolumeControl
