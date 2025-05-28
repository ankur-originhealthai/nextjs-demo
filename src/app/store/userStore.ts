import { create } from 'zustand'

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
    addUser : (user) =>set({user})
    ,
    removeUser : () => {
        set(() => ({
            user: null
        }));
    },
    addPatient : (patient) =>set({patient})
    

}))
export default useUserStore