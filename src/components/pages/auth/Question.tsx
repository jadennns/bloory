import {
  ChangeEvent,
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
} from "react";

interface Props {
  dispatch: Dispatch<SetStateAction<string | undefined>>;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

export default function Question({ dispatch, name, placeholder, type }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(e.target.value);

  return (
    <>
      <div className='flex flex-col items-center space-y-1 '>
        <p className='text-base text-gray-100 font-semibold underline'>
          {name}
        </p>
        <input
          type={type}
          onChange={handleChange}
          placeholder={placeholder}
          className='rounded-md bg-gray-100 outline-none px-1 py-1 w-[20rem]'
        />
      </div>
    </>
  );
}
