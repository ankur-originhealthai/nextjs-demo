"use client";
import Video from "next-video"
import { useState } from "react";

const Ultrasound_video = () => {
  const [startButton, setStartButton] = useState<String>("Start Recoring");
  const [endButton, setEndButton] = useState<Boolean>(false);
  const handleRecording = () => {
    setStartButton("Recoridng in Progress");
    setEndButton(true);
  };
  const handleEndRecoring = () => {
    setStartButton("StartRecording");
    setEndButton(false);
  };
  return (
    <div>
      <div className="bg-black">
        <div>
          <h2 className="text-shadow-amber-200">Let's start your Ultrasound</h2>
        </div>
        <div className="flex mx-4 justify-center items-center">
          <video autoPlay muted loop>
            <source src="/ultrasoundvideo.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="m-2 p-2 bg-red-400 rounded-2xl cursor-pointer text-white font-bold "
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
