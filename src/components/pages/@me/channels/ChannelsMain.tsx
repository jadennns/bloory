import Sidebar from "components/channels/Sidebar";
import Title from "components/seo/Title";
import { Channel, User } from "../../../../../@types/dts/user";
import Messages from "./Messages";

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
      <div className='absolute inset-y-0 left-0'>
        <Sidebar user={user} />
      </div>
      <Messages user={user} />
    </>
  );
}
