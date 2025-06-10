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
    examId: number | null,
    addUser: (user : User) => void
    removeUser : ()=> void
    addExamId: (examId : number) => void
    addPatient : (patient : Patient) => void
}


const useUserStore = create <userStore>((set) => ({
    user: null,
    patient: null,
    examId : null,
    addUser : (user) =>set({user}),
    addExamId: (examId) => set({examId}),
    removeUser : () => {
        set(() => ({
            user: null
        }));
    },
    addPatient : (patient) =>set({patient})
    

}))
export default useUserStore