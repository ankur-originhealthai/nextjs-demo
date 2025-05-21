// component for root of our application
"use client"
import Image from "next/image";
import Greet from "../components/greet";
import Counter from "../components/counter";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-2 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    
        <h2>Welcome to Radiology Department</h2>
        <h4>We wish you a healthy baby !!</h4>
        <button className="m-2 p-2 bg-blue-400 rounded-2xl cursor-pointer" onClick={() => router.push("/ultrasound_video")}> Start Ultrasound</button>

        

    </div>
  );
}
