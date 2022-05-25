import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Message, User } from "../../../../../@types/dts/user";
import MessageF from "./Message";
import MessageText from "./MessageText";

const client = io("http://localhost:4000/");

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const acceptImageDrop = useCallback((files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      fetch("/api/v1/image", {
        method: "POST",
        body: JSON.stringify({ data: reader.result }),
      })
        .then((res) => res.json())
        .then(({ data }) => {
          fetch(`/api/v1/channels/${router.query.id}/messages`, {
            method: "POST",
            body: JSON.stringify({
              content: data.url,
              author: user.id,
              channel_id: router.query.id,
              type: "image",
            }),
          });
        });
    };
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    noDrag: false,
    noClick: true,
    maxFiles: 1,
    accept: { "image/png": [".png", ".jpg", ".jpeg"] },
    maxSize: 8388608,
    onDrop: acceptImageDrop,
  });

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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
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
    </div>
  );
}
