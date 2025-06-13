"use client";
import axios from "axios";
import useUserStore from "../store/userStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import usePatientStore from "../store/patientStore";

export default function RecordingsPage() {
  type Recordings = {
    id: number;
    video: string;
  };

  const patientData = usePatientStore((state) => state.patient);
  const { examId } = usePatientStore();
  const patientId = patientData?.patientId;
  const [error, setError] = useState("");
  const [recordings, setRecordings] = useState<Recordings[]>([]);
  const router = useRouter();
  const addVideoPlaying = usePatientStore((state) => state.addVideoPlaying)
  const addRecording = usePatientStore((state) => state.addrecordings)
  const hasHydrated = useUserStore.persist?.hasHydrated?.() ?? false
    
    const fetchPatient = () => {
    const data = sessionStorage.getItem("Patient-Data")
    console.log(data)
    if (! (data)) {
      router.push("/patient");
    }
  };


  const getRecordings = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/stream/recordedVideos",
        {
          examId,
          patientId,
        },
        { withCredentials: true }
      );
      //console.log(res.data);
      setRecordings(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message);
      //console.log(err?.response?.data?.message);
    }
  }
  
    useEffect(() => {
    fetchPatient();
    getRecordings()
    if(!hasHydrated){
      return 
    }
  }, [hasHydrated, recordings]);
  const handleDelete = async (id: number) => {
    const recordingId = id;
    try {
      const res = await axios.post(
        "http://localhost:3001/stream/remove",
        {
          recordingId,
        },
        { withCredentials: true }
      );

      setRecordings((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-xl font-semibold mb-6">
        Patient Recordings (ExamId : {examId} )
      </h1>
      {!recordings || recordings.length == 0 ? (
        <h2 className="text-2xl text-white">
          No Recorded Videos of Patient {patientData?.firstName}
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recordings.map((rec) => (
            <div
              key={rec.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <video
                onPlay={() => addVideoPlaying(true)}
                onPause={() => addVideoPlaying(false)}
                onEnded={() => addVideoPlaying(false)}
                src={"http://localhost:3001" + rec.video}
                controls
                className="w-full h-52 object-cover"
              />
              <div className="flex items-center justify-center">
                <button
                  className="font-bold text-blue-700 text-center cursor-pointer"
                  onClick={() => handleDelete(rec.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
