// component for root of our application
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import useUserStore from "../store/userStore";
import axios from "axios";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const userData = useUserStore((state) => state.user);
  const addUser = useUserStore((state) => state.addUser);

  const fetchUser = async () => {
    
    if (userData ) {
      return;
    }
    try {
      const user = await axios.get("http://localhost:3001/profile", {
        withCredentials: true,
      });
      addUser(user.data.user);

    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() =>{
      fetchUser()
  }, [])

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-2 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl font-extrabold">
        Welcome to Radiology Department
      </h2>
      <h4 className="text-red-400">We wish you a healthy baby !!</h4>
      <button className="m-5 p-2 bg-blue-400 rounded-2xl cursor-pointer font-bold text-white">
        <Link href="/patient">Start Ultrasound</Link>{" "}
      </button>
      <p className="text-blue-400"> Before starting the Ultrasound , you will be asked to enter the details of your Patient</p>
    </div>
  );
}
