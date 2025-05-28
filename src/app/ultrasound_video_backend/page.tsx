"use client";
import Video from "next-video"
import { useRef, useState } from "react";
import ultrasoundvideo from '/videos/ultrasound.mp4';
import Instaplay from 'player.style/instaplay/react';

const Ultrasound_video = () => {
  const [startButton, setStartButton] = useState<String>("Start Recoring");
  const [endButton, setEndButton] = useState<Boolean>(false);
  const [clipUrl, setClipUrl] = useState <string | null>()
  const handleRecording = async() => {
    setStartButton("Recoridng in Progress");
    setEndButton(true);
    const res = await fetch("http://localhost:3001/video/record");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setClipUrl(url)
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_video.webm';
    a.click();
    URL.revokeObjectURL(url);// clear the memory
    
  };
  const handleEndRecoring = () => {
    setStartButton("StartRecording");
    setEndButton(false);
    
  };

  

  return (
    <div className="bg-black min-h-screen">
       
        <div className="flex mx-4 justify-center items-center-safe">
            <div className="w-[440px] h-[460px] ">
          <video className="w-full h-full" src="http://localhost:3001/video/stream" controls autoPlay muted>
          </video>
        </div>
        </div>
        
      <div className="flex justify-center items-center">
        <button
          className="m-2 p-2 bg-blue-400 rounded-2xl cursor-pointer text-white font-bold "
          onClick={handleRecording}
        >
          {startButton}
        </button>

        {endButton && (
          <button
            className="m-2 p-2 bg-blue-400 rounded-2xl cursor-pointer text-white font-bold"
            onClick={handleEndRecoring}
          >
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};
export default Ultrasound_video;
