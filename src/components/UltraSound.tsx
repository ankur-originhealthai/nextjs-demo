"use client";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../store/userStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

/** This is a ultraSound video component that displays the ultrasound video and
 * also provides a record button to start the recording
 *
 * Recording button shows the live data from api that recording was saved completely or not
 *
 * It makes a api call to get the ultrasound video from the backend and also makes a api call to record the video through backend.
 */

const Ultrasound = () => {
  const [startButton, setStartButton] = useState<String>("Start Recording");
  const [timeStamp, setTimeStamp] = useState<Number>(0);
  const getVideo = useRef<HTMLVideoElement | null>(null);
  //const [endButton, setEndButton] = useState<Boolean>(false);
  //const [clipUrl, setClipUrl] = useState <string | null>()
  const userData = useUserStore((state) => state.user);
  const patientData = useUserStore((state) => state.patient);
  const patientId = patientData?.patientId;

  const router = useRouter();
  const fetchUser = () => {
    if (!userData) {
      router.push("/login");
    }
  };
  const fetchPatient = () => {
    if (!patientData) {
      router.push("/patient");
    }
  };
  useEffect(() => {
    fetchUser();
    fetchPatient();
  }, []);

  const handleRecording = async () => {
    setStartButton("Recording in Progress...");
    const timestamp = getVideo?.current?.currentTime;
    if (timestamp) {
      setTimeStamp(timestamp);
    }
    const res = await axios.post(
      "http://localhost:3001/video/record",
      {
        patientId,
        timeStamp,
      },
      { withCredentials: true }
    );

    setInterval(() => {
      setStartButton(res.data.message);
    }, 5000);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="flex mx-4 justify-center items-center-safe">
        <div className="w-[540px] h-[560px] ">
          <video
            ref={getVideo}
            className="w-full h-full"
            data-testid="video_check"
            src="http://localhost:3001/video/stream"
            autoPlay
            muted
            loop
          ></video>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="m-2 p-2 bg-blue-400 rounded-2xl cursor-pointer text-white font-bold"
          onClick={handleRecording}
        >
          {startButton}
        </button>
      </div>
      <div className="flex justify-center items-center">
        <button className="m-2 p-2 bg-blue-400 rounded-2xl cursor-pointer text-white font-bold ">
          {" "}
          <Link href={"/patient"}>New Patient ?</Link>
        </button>
      </div>
    </div>
  );
};
export default Ultrasound;
