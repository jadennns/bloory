import Image from "next/image";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  dispatch: Dispatch<SetStateAction<string>>;
  avatar: string;
}

export default function SettingsDropzone({ dispatch, avatar }: Props) {
  const onDrop = useCallback(
    (files: File[]) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function () {
        dispatch(reader.result as string);
      };
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/png": [".png", ".jpg", ".jpeg"] },
    maxSize: 8388608,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Image
        src={avatar}
        alt={`Avatar`}
        width={128}
        height={128}
        className='rounded-full cursor-pointer'
      />
    </div>
  );
}
