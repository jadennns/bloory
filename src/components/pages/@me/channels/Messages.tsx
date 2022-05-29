import { ioConnect } from "lib/util/socketio";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Message, User } from "../../../../../@types/dts/user";
import MessageF from "./Message";
import MessageText from "./MessageText";

const client = ioConnect();

export default function Messages({ user }: { user: User }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [memberId, setMemberId] = useState<string | undefined>();
  const messagesEndRef = useRef<any>(null);

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/v1/channels/${router.query.id}/messages`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [router]);

  useEffect(() => {
    client.on("connect", () =>
      console.log(`Listening for events : ${client.id}`)
    );

    client.on("MESSAGE_CREATE", (payload) => {
      if (payload.channel_id !== router.query.id) return;
      setMessages([...messages, payload]);
    });
  }, [messages, router]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAddMember = () => {
    if (!memberId) return toast.error("Please input a valid user id");

    fetch(`/api/v1/channels/${router.query.id}/members`, {
      method: "POST",
      body: JSON.stringify({
        member: memberId,
      }),
    }).then(async (res) => {
      if (res.status !== 200) {
        const { message } = await res.json();
        return toast.warn(`${message}`, { position: "bottom-left" });
      } else
        toast.success("Successfully added user!", { position: "bottom-left" });
    });
  };

  return (
    <div className='flex flex-col space-y-4 items-start justify-start ml-[18rem] mt-6 '>
      <div className='bg-gray-800 flex flex-col py-1 space-y-4 items-center rounded-md h-[35rem] w-[72rem] scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-100'>
        {messages.map((message, index) => (
          <MessageF message={message} key={index + 1} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageText user={user} />
      <div className='flex items-center space-x-2'>
        <input
          type={"number"}
          placeholder='Enter user id to add'
          className='outline-none px-2 py-1 rounded-full'
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
        <button
          className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-1'
          onClick={handleAddMember}
        >
          Add User
        </button>
      </div>
    </div>
  );
}
