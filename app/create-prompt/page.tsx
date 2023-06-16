"use client"

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui";

const CreatePromptPage = () => {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const router = useRouter();
    const session = useSession();

    const createPrompt = async(e:FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
          const res = await fetch('api/prompt/new', {
            method: "POST",
            body: JSON.stringify({
              userId: session?.data?.user?.id,
              prompt: post.prompt,
              tag: post.tag
            })
          })

          if(res.ok){
            router.push('/');
          }
        } catch (error) {
          console.log(error);
        }finally{
          setSubmitting(false);
        }
    };

  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePromptPage