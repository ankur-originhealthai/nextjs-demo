"use client"
import axios, {AxiosError} from "axios"
import Link from "next/link"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "../../store/userStore";

const Login = () => {
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError]= useState("")
    const router = useRouter()
    const addUser = useUserStore((state) => state.addUser)

    const handleLogin = async () =>{
      setError("")
        try{
        const res = await axios.post("http://localhost:3001/auth/login",{
            emailId,
            password
        },
        {withCredentials: true})
        addUser(res.data.data)
        router.push('/')
        }
        catch(err){
          if(axios.isAxiosError(err) && err.response){
            setError(err.response.data.message)
            console.log("Error" + error)
          }
          
        }
        
    
        
        
    }

    return(
        <>
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="OMRL"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input 
                  type="email"
                  required
                  onChange={(e) => {
                    setEmailId(e.target.value)
                  }}
                  value={emailId}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  
                  type="password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  value={password}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className = "m-3 text-red-400">{error}</div>
            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
            <div className="m-2 px-10">
              Do not have an Account? 
              <Link
        href="/signUp"
        className="mr-4 text-blue px-3 font-extrabold"
      >
        SignUp
      </Link>
            </div>
            
          
        </div>
        
      </div>

        </>
    )
}
export default Login