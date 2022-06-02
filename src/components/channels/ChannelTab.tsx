import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCamera } from "react-icons/ai";
import { FaCopy, FaDoorOpen, FaSave, FaEdit } from "react-icons/fa";
import { Channel } from "../../../@types/dts/user";

export default function ChannelTab({ channel }: { channel: Channel }) {
  const [data, setData] = useState(channel.icon);
  const [changed, setChanged] = useState(false);
  const [nameChange, setNameChange] = useState(false);
  const [name, setName] = useState(channel.name);

  useEffect(() => {
    setData(channel.icon);
  }, [channel]);

  const onDrop = useCallback(([file]: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setData(reader.result as string);
      setChanged(true);
    };
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/png": [".png", ".jpg", ".jpeg"] },
    maxSize: 8388608,
  });

  const router = useRouter();

  const handleChannelNameChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`/api/v1/channels/${channel.id}/update`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
      }),
    }).then(() => {
      setNameChange(false);
      setTimeout(() => {
        router.reload();
      }, 1000);
    });
  };

  return (
    <div className='flex items-start justify-between bg-swatch-5 py-3 px-4 w-[18rem] rounded-md'>
      <div className='flex items-start space-x-4'>
        <div className='relative  tab-container'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <img
              src={data}
              alt={`${channel.name} Icon`}
              width={48}
              height={48}
              className='rounded-md  cursor-pointer opacity-1 block h-auto img-over'
            />
            <div className='middle opacity-0 absolute top-[50%] left-[50%]'>
              <AiOutlineCamera
                cursor={"pointer"}
                size={32}
                className='text-gray-300'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-1 items-start'>
          {nameChange ? (
            <form onSubmit={handleChannelNameChange}>
              <input
                type='text'
                className='outline-none bg-transparent border-b-2 w-32 text-gray-100 text-sm'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </form>
          ) : (
            <p className='text-gray-100 text-sm'>{channel.name}</p>
          )}
          <div className='flex items-center space-x-2'>
            <FaDoorOpen
              size={24}
              className='text-rose-600 hover:text-rose-700'
              cursor={"pointer"}
            />
            <FaCopy
              size={18}
              className='text-gray-300 hover:text-gray-400'
              cursor={"pointer"}
              onClick={() => navigator.clipboard.writeText(channel.id)}
            />
            <FaEdit
              size={20}
              className='text-gray-300 hover:text-gray-400'
              cursor={"pointer"}
              onClick={() => setNameChange(!nameChange)}
            />
          </div>
        </div>
      </div>
      {changed && (
        <FaSave
          className='text-green-600 hover:text-green-700 cursor-pointer'
          size={20}
          onClick={() => {
            fetch(`/api/v1/channels/${router.query.id}/icon`, {
              method: "POST",
              body: JSON.stringify({ data }),
            });

            setTimeout(() => {
              location.reload();
            }, 1000);
          }}
        />
      )}
    </div>
  );
}
