import Sidebar from "components/channels/Sidebar";
import Title from "components/seo/Title";
import UserTab from "components/users/UserTab";
import { useEffect } from "react";
import { User } from "../../../../@types/dts/user";

interface Props {
  user: User;
}

export default function Main({ user }: Props) {
  return (
    <>
      <Title title='@Me' />
      <div className='h-screen'>
        <Sidebar />
      </div>
      <div className='flex  flex-col items-center justify-center mt-[-30rem] space-y-6'>
        <div className='flex flex-col items-center space-y-2'>
          <h1 className='text-white text-6xl font-semibold'>Bloory App</h1>
        </div>
        <UserTab user={user} />
      </div>
    </>
  );
}
