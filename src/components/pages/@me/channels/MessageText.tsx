import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useState } from "react";
import { User } from "../../../../../@types/dts/user";

export default function MessageText({ onSubmit }: { onSubmit: () => void }) {
  const router = useRouter();

  const [content, setContent] = useState<string>();

  const handleCreateMessage = () => {
    fetch(`/api/v1/channels/${router.query.id}/messages`, {
      method: "POST",
      body: JSON.stringify({
        content,
        author: "1",
        channel_id: router.query.id,
      }),
    });
  };

  return (
    <textarea
      className='outline-none bg-gray-800 text-gray-200 rounded-md px-1 py-1 w-[60rem] h-14 scrollbar-thin scrollbar-thumb-amber-600 '
      id='messageText'
      placeholder='Type your message here!!! ✍'
      value={content}
      onChange={(e) => setContent(e.target.value)}
      onKeyPress={(e) => {
        if (e.key == "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleCreateMessage();
        }
      }}
    />
  );
}
