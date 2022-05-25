import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImFilePicture } from "react-icons/im";
import { User } from "../../../../../@types/dts/user";

export default function MessageText({ user }: { user: User }) {
  const router = useRouter();

  const [content, setContent] = useState<string>();
  const textAreaRef = useRef<any>(null);

  const handleCreateMessage = () => {
    fetch(`/api/v1/channels/${router.query.id}/messages`, {
      method: "POST",
      body: JSON.stringify({
        content,
        author: user.id,
        channel_id: router.query.id,
        type: "message",
      }),
    }).then(() => {
      setContent(undefined);
      textAreaRef.current.value = "";
    });
  };

  const onDrop = useCallback((files: File[]) => {
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
          }).then(() => {
            setContent(undefined);
            textAreaRef.current.value = "";
          });
        });
    };
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    noDrag: true,
    maxFiles: 1,
    accept: { "image/png": [".png", ".jpg", ".jpeg"] },
    maxSize: 8388608,
  });

  return (
    <div className='flex items-center space-x-6'>
      <textarea
        className='outline-none bg-gray-800 text-gray-200 rounded-md px-[0.5rem] py-1 w-[60rem] h-14 scrollbar-thin scrollbar-thumb-amber-600 '
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
        ref={textAreaRef}
      />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <ImFilePicture
          className='text-primary-100 hover:text-primary-200 cursor-pointer'
          size={30}
        />
      </div>
    </div>
  );
}
