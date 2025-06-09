import { create } from 'zustand'
import {User} from "../types/userType"
import {Patient} from "../types/patientType"
/** This is a Store component that creates the store for User and Patient data
 * It has different functions such as - 
 * 1. addUser
 * 2. removeUser
 * 3. addPatient data
 */


type userStore = {
    user: User |null,
    patient: Patient| null,
    addUser: (user : User) => void
    removeUser : ()=> void
    addPatient : (patient : Patient) => void
}


const useUserStore = create <userStore>((set) => ({
    user: null,
    patient: null,
    addUser : (user) =>set({user}),
    removeUser : () => {
        set(() => ({
            user: null
        }));
    },
    addPatient : (patient) =>set({patient})
    

}))
export default useUserStore