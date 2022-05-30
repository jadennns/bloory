import Members from "components/channels/Members";
import Sidebar from "components/channels/Sidebar";
import Messages from "components/messages/Messages";
import Title from "components/seo/Title";
import { Channel, User } from "../../../../../@types/dts/user";

export default function ChannelsMain({
  user,
  channel,
}: {
  user: User;
  channel: Channel;
}) {
  return (
    <>
      <Title title={channel.name} />
      <div className='fixed flex items-center h-screen min-h-screen'>
        <Sidebar />
        <div className='flex items-center space-x-10'>
          <Members user={user} channel={channel} />
          <Messages user={user} />
        </div>
      </div>
    </>
  );
}
