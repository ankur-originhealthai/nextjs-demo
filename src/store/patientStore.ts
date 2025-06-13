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
  patient: Patient | null;
  isVideoPlaying: boolean
  examId: number | null;
  addExamId: (examId: number) => void;
  addPatient: (patient: Patient) => void;
  addVideoPlaying: (isVideoPlaying : boolean) => void;
};
export const usePatientStore = create<userStore>()(
  persist(
    (set) => ({
      patient: null,
      examId: null,
      isVideoPlaying: false,
      addExamId: (examId) => set({ examId }),
      addPatient: (patient) => set({ patient }),
      addVideoPlaying : (isVideoPlaying) => set({isVideoPlaying})
    }),
    {
      name: "Patient-Data",
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
export default usePatientStore;
