"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
export const Navigations =() =>{
    const pathname = usePathname()
    return(
        <nav>
            <Link href="/" className={pathname === "/" ? "font-bold mr-4" : "mr-4 text-blue-500"}>Home</Link>
            <Link href="/about" className={pathname === "/about" ? "font-bold mr-4" : "mr-4 text-blue-500"}>About</Link>
            <Link href="/login" className={pathname === "/login" ? "font-bold mr-4" : "mr-4 text-blue-500"}>Login</Link>
            <Link href="/products/1" className={pathname.startsWith("/products/1") ? "font-bold mr-4" : "mr-4 text-blue-500"}>Product</Link>
        </nav>
    )
}