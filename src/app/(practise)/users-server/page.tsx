
const Users_server = async () => {
  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string; 
  };

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const user = await res.json();
    


  return (
    <>
      {user.map((us : User) => (
        <div key={us.id} className="flex m-2">
          <div>{us.id + " " + us.name}</div>
          <div className="mx-2">username: {us.username}</div>
        </div>
      ))}
    </>
  );
};
export default Users_server