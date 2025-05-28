"use client"
import { useEffect} from "react"
const Error = ({error} : {error : Error}) => {
    

    return (
        <h1 className="text-red-200">{error.message}</h1>
    )
}
export default Error