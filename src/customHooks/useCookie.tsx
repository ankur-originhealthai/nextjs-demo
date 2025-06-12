import { cookies } from 'next/headers'
 
const useCookie = async () =>{

  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  return token;
 

}
export default useCookie