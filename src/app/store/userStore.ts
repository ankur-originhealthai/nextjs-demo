import { create } from 'zustand'

type User = {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    disease: string;
    userId: number
}

type userStore = {
    user: User[],
    addUser: (user : User) => void
    removeUser : ()=> void
}

const useUserStore = create <userStore>((set) => ({
    user: [],
    addUser : (user) =>{
        set((state) => ({
            user : [user, ...state.user]
        }))
    },
    removeUser : () => {
        set(() => ({
            user: []
        }));
    }

}))
export default useUserStore