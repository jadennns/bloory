import { Message } from "../../../../../@types/dts/user";

export default function MessageF({ message }: { message: Message }) {
  return (
    <div className='flex items-center space-x-2 w-[70rem] rounded-md hover:bg-gray-700 px-[0.5rem] py-1'>
      <img
        src={message.author.avatar}
        alt={`${message.author.username} Avatar`}
        width={42}
        height={42}
        className='rounded-full'
      />
      <div className='flex flex-col items-start space-y-1'>
        <p className='text-sm text-accent hover:underline cursor-pointer'>
          {message.author.username}
        </p>
        {message.type == "image" && (
          <img
            src={message.content}
            alt='Message Attachment'
            width={80}
            height={80}
          />
        )}
        {message.type == "message" && (
          <p className='text-base text-gray-200'>{message.content}</p>
        )}
      </div>
    </div>
  );
}
