import { create } from 'zustand'
/** This is a Store component that creates the store for User and Patient data
 * It has different functions such as - 
 * 1. addUser
 * 2. removeUser
 * 3. addPatient data
 */
type User = {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    disease: string;
    userId: number;
}
type Patient = {
    firstName: string;
    lastName: string;
    disease: string;
    userId: number;
    patientId: number;
}

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