"use client";
import axios from "axios";
import useUserStore from "../app/store/userStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export const Navigations = () => {
  const router = useRouter();
  const pathname = usePathname();
  const User = useUserStore((state) => state.user);
  const Logout = useUserStore((state) => state.removeUser);
  const userData = useUserStore((state) => state.user);
  const addUser = useUserStore((state) => state.addUser);
  const fetchUser = async () => {
    console.log(userData)
    if (userData ) {
      return;
    }
    try {
      console.log("api")
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

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/auth/logout",
        {},
        { withCredentials: true }
      );
      router.push("/login");
      Logout();
    } catch (err) {
      console.error(err);
    }
  };

  console.log(User);
  return (
    <nav className="bg-blue-950 py-3">
      <div>
        <Link
          href="/"
          className={
            pathname === "/" ? "font-bold mr-4 text-white" : "mr-4 text-white"
          }
        >
          Home
        </Link>
        <Link
          href="/about"
          className={
            pathname === "/about"
              ? "font-bold mr-4 text-white"
              : "mr-4 text-white"
          }
        >
          About
        </Link>
        {!User && (
          <Link
            href="/login"
            className={
              pathname === "/login"
                ? "font-bold mr-4 text-white"
                : "mr-4 text-white"
            }
          >
            Login
          </Link>
        )}

        {User&& (
          <>
          <button
            className="mr-4 text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout 
          </button>
          <Link href=""
          className="mr-4 text-white">
          Hi, Dr. {User.firstName}
        </Link>
          
          
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
