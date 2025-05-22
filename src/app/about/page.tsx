"use client";
import { useRouter } from "next/navigation";
const About = () =>{
    const router = useRouter();
    return(
        <div className="justify-items-center">
        <h1 className="text-2xl">Radiology Department</h1>
        <p className="text-xl text-blue-400 m-2">Improve your ultrasound experience with us.</p>
        </div>
    )
}
export default About