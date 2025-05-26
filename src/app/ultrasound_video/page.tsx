"use client";
import Video from "next-video"
import { useRef, useState } from "react";
import ultrasoundvideo from '/videos/ultrasound.mp4';
import Instaplay from 'player.style/instaplay/react';

const Ultrasound_video = () => {
  const [startButton, setStartButton] = useState<String>("Start Recoring");
  const [endButton, setEndButton] = useState<Boolean>(false);
  const handleRecording = () => {
    setStartButton("Recoridng in Progress");
    setEndButton(true);
    startRecording()
  };
  const handleEndRecoring = () => {
    setStartButton("StartRecording");
    setEndButton(false);
    stopRecording()
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);// refrence to the video element
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); //refrence to the recorded media

  const startRecording = () => {
    const videoElementDOM = videoRef.current;//get the video from dom , videoREf.current will point to video tag in the DOM
    if (!videoElementDOM) return;
    const stream = (videoElementDOM as any).captureStream?.(); // convert the video into readable stream
    if (!stream) {
      alert('captureStream not supported on this video element.');
      return;
    }
    //MediaREcorder can record a media stream like 
    //give it a meida stream , it will give you the recorded chunks
    const mediaRecorder = new MediaRecorder(stream); // give the video to mediarecorder to create an recorder
    const chunks: Blob[] = []; //array to collect the pieces of the recorded video
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      } // everytime we get the chunk, push itnto the array
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' }); // when recording stops ,combine all the chunks into one video blob
      const url = URL.createObjectURL(blob); // create a url , set the url to video and autoclick it
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recorded_video.webm';
      a.click();
      URL.revokeObjectURL(url);// clear the memory
    };
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder; // saves the recorded media here and have access to it, to stop the recording further
  };
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  
  };

  return (
    <div className="bg-black min-h-screen">
       
        <div className="flex mx-4 justify-center items-center-safe">
            <div className="w-[440px] h-[460px] ">
          <Video className="w-full h-full" ref={videoRef} src={ultrasoundvideo} controls autoPlay>
          </Video>
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
