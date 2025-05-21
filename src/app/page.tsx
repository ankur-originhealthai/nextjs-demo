// component for root of our application
"use client"
import Image from "next/image";
import Greet from "../components/greet";
import Counter from "../components/counter";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button className="m-2 p-2 bg-blue-400 rounded-2xl cursor-pointer" onClick={() => router.push("/ultrasound_video")}> Start Ultrasound</button>

        
      </main>
    </div>
  );
}
