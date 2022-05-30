import Sidebar from "components/channels/Sidebar";
import Title from "components/seo/Title";
import { useEffect } from "react";
import { User } from "../../../../@types/dts/user";

interface Props {
  user: User;
}

export default function Main({ user }: Props) {
  return (
    <>
      <Title title='@Me' />
      <div className='grid grid-cols-3 gap-4'>
        <Sidebar />
      </div>
    </>
  );
}
