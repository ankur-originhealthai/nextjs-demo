import { revalidatePath } from "next/cache";
import { Revalidate } from "next/dist/server/lib/cache-control";
const Mock_users = async () => {
  type MockUser = {
    id: number;
    name: string;
  };

    const res = await fetch("https://6725afb9c39fedae05b58958.mockapi.io/users");
    const user = await res.json();
    
    async function addUser(formData: FormData){
        "use server";
        const name = formData.get("name")
        const res = await fetch("https://6725afb9c39fedae05b58958.mockapi.io/users",
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",

                },
                body: JSON.stringify({name})
            }
            
        )
        const newUser = await res.json();
        revalidatePath("/mock-users")
        console.log(newUser)
    }

  return (
    <>
    <div>
        <form action={addUser} className="mb-4">
            <input type="text" name="name" required className="border p-2 mr-2">
            </input>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
      <div>
        {user.map((us : MockUser) => (
        <div key={us.id} className="flex m-2">
          <div className="text-blue-400">{us.name}</div>
        
        </div>
      ))}
      </div>
      
    </>
  );
};
export default Mock_users