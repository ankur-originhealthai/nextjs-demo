import { create } from "zustand";
import { User } from "../types/userType";
import { Patient } from "../types/patientType";
import { persist, createJSONStorage } from "zustand/middleware";
/** This is a Store component that creates the store for User and Patient data
 * It has different functions such as -
 * 1. addUser
 * 2. removeUser
 * 3. addPatient data
 */

type userStore = {
  user: User | null;
  patient: Patient | null;
  examId: number | null;
  addUser: (user: User) => void;
  removeUser: () => void;
  addExamId: (examId: number) => void;
  addPatient: (patient: Patient) => void;
};
export const useUserStore = create<userStore>()(
  persist(
    (set, get) => ({
      user: null,
      patient: null,
      examId: null,
      addUser: (user) => set({ user }),
      addExamId: (examId) => set({ examId }),
      removeUser: () => {
        set(() => ({
          user: null,
          
        }));
      },
      addPatient: (patient) => set({ patient }),
    }),
    {
      name: "User-Data",
       storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// const useUserStore = create <userStore>((set, get) => ({

//     user: null,
//     patient: null,
//     examId : null,
//     addUser : (user) =>set({user}),

//     addExamId: (examId) => set({examId}),
//     removeUser : () => {
//         set(() => ({
//             user: null
//         }));
//     },
//     addPatient : (patient) =>set({patient})

// }))
export default useUserStore;
