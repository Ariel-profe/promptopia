"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { IPrompt } from "@/interfaces/prompt";

const ProfileByIdPage = ({ params }: { params: { id: string } }) => {

    const paramsName = useSearchParams();
    const userName = paramsName.get('name');
    const [userPrompts, setUserPrompts] = useState<IPrompt[]>([]);

    useEffect(() => {
        const fetchPrompts = async() => {
            const res = await fetch(`/api/users/${params?.id}/posts`);
          const data = await res.json();
          setUserPrompts(data);
        };
    
        if(params?.id) fetchPrompts();
      }, [params?.id]);
    
    
  return (
    <Profile
        name={userName || ''} 
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`} 
        data={userPrompts}  
    />
  )
}

export default ProfileByIdPage