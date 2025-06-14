"use client";
import axios from "axios";
import useUserStore from "../store/userStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/** This is a Navbar component that helps the doctors to toggle between different pages
 * It has options such as -
 * About
 * Home
 * Login
 * Logout
 */
export const Navigations = () => {
  const router = useRouter();
  const pathname = usePathname();
  const Logout = useUserStore((state) => state.removeUser);
  const userData = useUserStore((state) => state.user);
  const addUser = useUserStore((state) => state.addUser);
  const fetchUser = async () => {
    
    if (userData) {
      return;
    }
    try {
      if(document.cookie.includes('token')){
        const user = await axios.get("http://localhost:3001/profile", {
        withCredentials: true,
      });
      addUser(user.data.user);

      }
      
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() =>{
      fetchUser()
      const cookies = document.cookie;
      const hasToken = cookies.split(";").some(cookie => 
        cookie.trim().startsWith("token="))
        if(!hasToken){
          sessionStorage.removeItem("User-Data")
          //router.push("/login")
        }
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/auth/logout",
        {},
        { withCredentials: true }
      );
      Logout();
      sessionStorage.clear();
      router.push("/login");
      
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecordings = async () => {
    
      router.push("/recordings");
      
  };
  return (
    <nav className="bg-blue-950 py-3">
      <div>
        <Link
          href="/"
          className={
            pathname === "/" ? "mr-4 text-white" : "mr-4 text-white"
          }
        >
          Home
        </Link>
        <Link
          href="/about"
          className={
            pathname === "/about"
              ? "mr-4 text-white"
              : "mr-4 text-white"
          }
        >
          About
        </Link>
        {!userData && (
          <Link
            href="/login"
            className={
              pathname === "/login"
                ? "mr-4 text-white"
                : "mr-4 text-white"
            }
          >
            Login
          </Link>
        )}

        {userData&& (
          <>
          <button
            className="mr-4 text-white cursor-pointer"
            onClick={handleRecordings}
          >
            Recordings
          </button>
          <button
            className="mr-4 text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout 
          </button>

          <button
          className="text-white text-right right-0" >
          Hi, Dr. {userData.firstName}
        </button>

        
          </>
        )
        
        }

        
      </div>
      {/* <Link
        href="/products/1"
        className={
          pathname.startsWith("/products/1")
            ? "font-bold mr-4"
            : "mr-4 text-blue-500"
        }
      >
        Product
      </Link> */}
    </nav>
  );
};
