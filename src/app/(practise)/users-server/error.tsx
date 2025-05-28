"use client"
import { useEffect} from "react"
const Error = ({error} : {error : Error}) => {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <h1 className="text-red-500">{error.message}</h1>
    )
}
export default Error