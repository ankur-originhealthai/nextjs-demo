"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Patient = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [disease, setDisease] = useState("None")
  const [error, setError] = useState("")

  const route = useRouter()

  const handlePatientDetails = async () => {
    setError("")
    try {
      const res = await axios.post("http://localhost:3001/user/signUp", {
        firstName,
        lastName,
        disease,
        emailId,
        password
      },
        { withCredentials: true })
      route.push('/ultrasound_video_backend')
    }
    catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message)
        console.log("Error" + error)
      }

    }

  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="OMRL"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Fill your patient's data
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                value={firstName}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                value={lastName}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Disease
              </label>
            </div>
            <div className="mt-2">
              <input

                type="text"
                required
                onChange={(e) => {
                  setDisease(e.target.value)
                }}
                value={disease}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className = "m-3 text-red-400">{error}</div>
          <div>
            <button
              onClick={handlePatientDetails}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>

        </div>
      </div>

    </>
  )
}
export default Patient