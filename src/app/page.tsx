// component for root of our application
"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const router = useRouter();

  
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-2 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    
        <h2 className="text-2xl font-extrabold">Welcome to Radiology Department</h2>
        <h4 className="text-red-400">We wish you a healthy baby !!</h4>
        <button className="m-5 p-2 bg-blue-400 rounded-2xl cursor-pointer font-bold text-white"><Link href='/ultrasound_video_backend'>Start Ultrasound</Link> </button>
        
    </div>
  );
}