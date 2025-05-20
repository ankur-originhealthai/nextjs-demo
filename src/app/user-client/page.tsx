"use client"
import { useState, useEffect } from "react";

const User_client = () => {
  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string; 
  };
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchUser = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUser(data);
      setLoading(false);
    } catch (err) {
        if(err instanceof Error){
            setError(err.message);
        }
      
    }finally{
        setLoading(false)
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  if(loading){
    return (
        <>
        Data being fetched</>
    )
  }
  return (
    <>
      {user.map((us) => (
        <div key={us.id} className="flex m-2">
          <div>{us.id + " " + us.name}</div>
          <div className="mx-2">username: {us.username}</div>
        </div>
      ))}
    </>
  );
};
export default User_client