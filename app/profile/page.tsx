"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Profile } from "@/components/ui";
import { IPrompt } from "@/interfaces/prompt";

const ProfilePage = () => {

    const [prompts, setPrompts] = useState<IPrompt[]>([]);
    
    const router = useRouter();
    const session = useSession();
    
    useEffect(() => {
    const fetchPrompts = async() => {
      const res = await fetch(`/api/users/${session?.data?.user.id}/posts`);
      const data = await res.json();
      setPrompts(data);
    };

    if(session.data?.user.id) fetchPrompts();
  }, [session?.data?.user.id]);


    const handleEdit = (prompt:IPrompt) => {
      router.push(`/update-prompt?id=${prompt._id}`)
    };

    const handleDelete = async(prompt:IPrompt) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${prompt._id.toString()}`, {
            method: "DELETE"
          });

          const filteredPrompts = prompts.filter( post => post._id !== prompt._id);
          setPrompts(filteredPrompts);
        } catch (error) {
          console.log(error);
        }
      }
    };

  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default ProfilePage