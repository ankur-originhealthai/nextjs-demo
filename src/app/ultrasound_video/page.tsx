"use client"
import {useState} from "react"

const Ultrasound_video = () => {
    const [startButton, setStartButton] = useState <String>("Start Recoring")
  return (
    <div className="bg-black">
      <div>
        <h2>Let's start your Ultrasound</h2>
      </div>
      <div className="flex mx-4 justify-center items-center">
        <video width="520" height="440" autoPlay muted loop>
          <source src="/ultrasoundvideo.mp4" type="video/mp4"></source>
        </video>
      </div>
      
    </div>
  );
};
export default Ultrasound_video;
