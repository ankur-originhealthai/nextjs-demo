"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const Navigations = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-blue-950 py-3">
      <div>
        <Link
        href="/"
        className={pathname === "/" ? "font-bold mr-4 text-white" : "mr-4 text-white"}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about" ? "font-bold mr-4 text-white" : "mr-4 text-white"
        }
      >
        About
      </Link>
      <Link
        href="/login"
        className={
          pathname === "/login" ? "font-bold mr-4 text-white" : "mr-4 text-white"
        }
      >
        Login
      </Link>
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
