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
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "recording" | "saved" | "failed">("idle");
  const [response, setResponse] = useState<string>("");
  const getVideo = useRef<HTMLVideoElement | null>(null);
  const userData = useUserStore((state) => state.user);
  const patientData = useUserStore((state) => state.patient);
  const patientId = patientData?.patientId;
  const router = useRouter();
  const { examId } = useUserStore();
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
    try {
      setStatus("recording");
      console.log(getVideo.current?.currentTime)
      const timestamp:number = getVideo?.current?.currentTime!;
      if (timestamp) {
        setTimeStamp(timestamp);
      }
      const res = await axios.post(
        "http://localhost:3001/stream/record",
        {
          patientId,
          timeStamp:timestamp,
          examId,
        },
        { withCredentials: true }
      );
      setResponse(res.data.message);
      setTimeout(() => {
        if (res.status === 201) {
          setStatus("saved");
        }
        setTimeout(() => {
        setStatus("idle");
      }, 1000);
      }, 4000);

      
    } catch (err: any) {
      setStatus("failed");
    }
  };

  const startButton = () => {
    switch (status) {
      case "idle":
        return "Start Recording";
      case "recording":
        return "Recording in Progress";
      case "saved":
        return "Recording saved";
      case "failed":
        return "Try again";
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="text-amber-50">
        <div className="navbar bg-blue-950 shadow-sm">
  <a className=" text-white font-mono">{patientData?.firstName} </a>
  <a className=" text-white font-mono">{patientData?.lastName} </a>
   <a className=" text-white font-mono"> Patient Id: {patientData?.patientId}</a>
</div>
      </div>
      <div className="flex justify-center items-center-safe">
        
        <div className="w-[540px] h-[500px] ">
          <video
            ref={getVideo}
            className="w-full h-full"
            data-testid="video_check"
            src="http://localhost:3001/stream/video"
            autoPlay
            muted
            loop
          ></video>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleRecording}
          disabled={status == "recording" || status == "saved"}
        >
          {startButton()}
        </button>
      </div>
      <div className=" m-2 flex justify-center items-center">
        <button className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          {" "}
          <Link href={"/patient"}>New Patient ?</Link>
        </button>
      </div>
    </div>
  );
};
export default Ultrasound;
