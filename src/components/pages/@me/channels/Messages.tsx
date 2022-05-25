import Title from "components/seo/Title";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Message, User } from "../../../../../@types/dts/user";
import MessageText from "./MessageText";

const client = io("http://localhost:4000/");

export default function Messages({ user }: { user: User }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<any>(null);

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

    client.on("MESSAGE_CREATE", (payload) =>
      setMessages([...messages, payload])
    );
  }, [messages]);

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Title title={"Messages"} />
      <div className='flex flex-col space-y-4 items-start justify-start ml-[18rem] mt-6 '>
        <div
          className='bg-gray-800 px-2 py-2 flex flex-col space-y-4 items-center rounded-md h-[35rem] scrollbar scrollbar-thumb-amber-500 scrollbar-track-gray-100'
          ref={messagesRef}
        >
          {messages.map((message, index) => (
            <div
              className='flex items-center space-x-2 w-[75rem] rounded-md hover:bg-gray-700 px-1 py-1'
              key={index + 1}
            >
              <img
                src={message.author.avatar}
                alt={`${message.author.username} Avatar`}
                width={42}
                height={42}
                className='rounded-full'
              />
              <div className='flex flex-col items-start'>
                <p className='text-sm text-accent hover:underline cursor-pointer'>
                  {message.author.username}
                </p>
                <p className='text-base text-gray-200'>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <MessageText
          onSubmit={() => {
            const dom = document.getElementById("messages") as HTMLDivElement;
            dom.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </>
  );
}
