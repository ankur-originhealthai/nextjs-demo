"use client";
import Video from "next-video"
import { useRef, useState } from "react";
import ultrasoundvideo from '/videos/ultrasound.mp4';
import Instaplay from 'player.style/instaplay/react';
import useUserStore from "../store/userStore";
import axios from "axios";
import Link from "next/link";

const Ultrasound_video = () => {
  const [startButton, setStartButton] = useState<String>("Start Recoring");
  const [endButton, setEndButton] = useState<Boolean>(false);
  const [clipUrl, setClipUrl] = useState <string | null>()

  const patientData = useUserStore((state) => state.patient);
  const patientId = patientData?.patientId
  const handleRecording = async() => {
    setStartButton("Recoridng in Progress...");
    setEndButton(true);
    const res = await axios.post("http://localhost:3001/video/record",{
            patientId
        },
        {withCredentials: true})
    setInterval(() => {
      setStartButton(res.data.message)
      
    },5000)
    



    // const blob = await res.blob();
    // const url = URL.createObjectURL(blob);
    // setClipUrl(url)
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'recorded_video.webm';
    // a.click();
    // URL.revokeObjectURL(url);// clear the memory
    
  };
  

  

  return (
    <div className="bg-black min-h-screen">
       
        <div className="flex mx-4 justify-center items-center-safe">
            <div className="w-[640px] h-[660px] ">
          <video className="w-full h-full" src="http://localhost:3001/video/stream" autoPlay muted loop>
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

      </div>
      <div className="flex justify-center items-center"><button className="m-2 p-2 bg-blue-400 rounded-2xl cursor-pointer text-white font-bold "> <Link href={"/patient"}>New Patient ?</Link></button></div>
      
    </div>
  );
};
export default Ultrasound_video;
