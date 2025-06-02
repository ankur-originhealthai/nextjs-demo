"use client";
import { useRouter } from "next/navigation";
/** This is a About component that displays the information about the company
 */
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