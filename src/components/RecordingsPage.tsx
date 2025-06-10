"use client";
import axios from "axios";
import useUserStore from "../store/userStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecordingsPage() {
  type Recordings = {
    id: number;
    video: string;
  };

  const patientData = useUserStore((state) => state.patient);
  const { examId } = useUserStore();
  const patientId = patientData?.patientId;
  const [error, setError] = useState("");
  const [recordings, setRecordings] = useState<Recordings[]>([]);
  const router = useRouter();
  const fetchPatient = () => {
    if (!patientData) {
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
      console.log(res.data);
      setRecordings(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message);
      console.log(err?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchPatient()
    getRecordings();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Patient Recordings</h1>
      {(!recordings || recordings.length == 0) ? <h2 className= "text-2xl text-white">No Recorded Videos of Patient {patientData?.firstName}</h2> :
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recordings.map((rec) => (
          <div
            key={rec.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <video
              src={"http://localhost:3001" + rec.video}
              controls
              className="w-full h-52 object-cover"
            />
          </div>
        ))}
      </div>}
    </div>
  );
}
