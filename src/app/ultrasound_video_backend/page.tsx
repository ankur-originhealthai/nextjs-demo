"use client";
import Video from "next-video"
import { useState } from "react";
import useUserStore from "../store/userStore";
import axios from "axios";
import Link from "next/link";

/** This is a ultraSound video component that displays the ultrasound video and 
 * also provides a record button to start the recording
 * 
 * Recording button shows the live data from api that recording was saved completely or not
 * 
 * It makes a api call to get the ultrasound video from the backend and also makes a api call to record the video through backend.
 */

const Ultrasound_video = () => {
  const [startButton, setStartButton] = useState<String>("Start Recording");
  //const [endButton, setEndButton] = useState<Boolean>(false);
  //const [clipUrl, setClipUrl] = useState <string | null>()

  const patientData = useUserStore((state) => state.patient);
  const patientId = patientData?.patientId
  const handleRecording = async() => {
    setStartButton("Recoridng in Progress...");
    
    const res = await axios.post("http://localhost:3001/video/record",{
            patientId
        },
        {withCredentials: true})

    if(res){
      alert(res.data.message)
    }
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
            <div className="w-[540px] h-[560px] ">
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
