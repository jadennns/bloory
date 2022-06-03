import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Message, User } from "../../../@types/dts/user";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineEmojiSymbols } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { ioConnect } from "lib/util/socketio";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "styles/sass/Animations.module.scss";

const socket = ioConnect();

export default function Messages({ user }: { user: User }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>();
  const [openEmojis, setOpenEmojis] = useState(false);

  const textAreaRef = useRef<any>(null);
  const bottomRef = useRef<any>(null);

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/v1/channels/${router.query.id}/messages`)
      .then((res) => res.json())
      .then(setMessages);
  }, [router]);

  useEffect(() => {
    socket.on("connect", () =>
      console.log(`Listening for events : ${socket.id}`)
    );

    socket.on("MESSAGE_CREATE", (payload) => {
      setMessages([...messages, payload]);
    });
  }, [messages]);

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

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    noDrag: true,
    maxFiles: 1,
    accept: { "image/png": [".png", ".jpg", ".jpeg"] },
    maxSize: 8388608,
  });

  const handleCreateMessage = () => {
    if (content) {
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
    }
  };

  const handleEmojis = () => {
    setOpenEmojis(!openEmojis);
  };

  return (
    <>
      <div className='h-screen mt-10 right-0'>
        <div className='flex flex-col items-start space-y-3'>
          <div className='flex flex-col items-start space-y-3 h-[38rem] w-[62rem] scrollbar scrollbar-thumb-swatch-6'>
            {messages.map((message, index) => (
              <MessageC message={message} key={index + 1} />
            ))}
            <div ref={bottomRef} />
          </div>
          <div className='w-[56rem] px-1 py-1 bg-[#27292d] rounded-md flex items-center space-x-3 text-sm'>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className='outline-none bg-transparent px-1 text-gray-100 w-[49rem]  resize-none scrollbar-thin scrollbar-thumb-swatch-6 placeholder:select-none'
              placeholder='Type your message'
              onKeyPress={(e) => {
                if (e.key == "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleCreateMessage();
                }
              }}
              ref={textAreaRef}
              id='message_box'
              onClick={() => {
                setOpenEmojis(false);
              }}
            />
            <div className='flex flex-col items-center space-y-1'>
              {openEmojis && (
                <div className='absolute mt-[-15rem]'>
                  <EmojisBar setContent={setContent} content={content} />
                </div>
              )}
              <MdOutlineEmojiSymbols
                className='text-[#d3d4d3]'
                size={25}
                cursor='pointer'
                onClick={handleEmojis}
              />
            </div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              <BsFillPlusSquareFill
                className='text-[#d3d4d3]'
                size={25}
                cursor='pointer'
              />
            </div>

            <RiSendPlaneFill
              className='text-[#d3d4d3]'
              size={25}
              cursor='pointer'
              onClick={handleCreateMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function EmojisBar({
  setContent,
  content,
}: {
  setContent: Dispatch<SetStateAction<string | undefined>>;
  content: string | undefined;
}) {
  const [emojis, setEmojis] = useState([
    "⚽️",
    "🏀",
    "🏈",
    "⚾️",
    "🎾",
    "🏐",
    "🏉",
    "🎱",
    "🏓",
    "🏸",
    "🥅",
    "🏒",
    "🏑",
    "🏏",
    "⛳️",
    "🏹",
    "🎣",
    "🥊",
    "🥋",
    "⛸",
    "🎿",
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚎",
    "🏎",
    "🚓",
    "🚑",
    "🚒",
    "🚐",
    "🚚",
    "🚛",
    "🚜",
    "🛴",
    "🚲",
    "🛵",
    "🏍",
    "🚨",
    "🚔",
    "🚍",
    "🚘",
    "🚖",
    "🚡",
    "🚠",
    "🚟",
    "🚃",
    "🚋",
    "🚞",
    "🚝",
    "🚄",
    "🚅",
  ]);

  const [emojiName, setEmojiName] = useState<string>();

  return (
    <div className={styles["growdown"]}>
      <div className='bg-[#27292d] w-[15rem] rounded-md flex flex-col space-y-3 px-2 py-2  h-[13rem]'>
        <div className='flex items-center space-x-2 bg-swatch-3 px-1 py-1 rounded-md'>
          <AiOutlineSearch className='text-[#d3d4d3]' size={19} />
          <input
            type='text'
            className='outline-none bg-transparent text-sm text-gray-100'
            value={emojiName}
            onChange={(e) => setEmojiName(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-6 gap-2 h-[10rem] scrollbar scrolbar-thumb-swatch-4'>
          {emojis.map((emoji, index) => (
            <p
              key={index + 1}
              className='select-none cursor-pointer'
              onClick={() =>
                setContent(content ? `${content} ${emoji}` : emoji)
              }
            >
              {emoji}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const emojis = [];

function MessageC({
  message: { author, content, type },
}: {
  message: Message;
}) {
  return (
    <div className='flex items-center space-x-2'>
      <img
        src={author.avatar}
        alt={`${author.username} Avatar`}
        width={45}
        height={45}
        className='rounded-full'
      />
      <div className='flex items-start flex-col space-y-1'>
        <p className='text-gray-300 text-xs'>{author.username}</p>
        {type == "image" && (
          <Image
            src={content}
            alt={author.username + " Image Content"}
            width={128}
            height={128}
          />
        )}
        {type == "message" && (
          <div className='rounded-md bg-[#27292d] max-w-[55rem] text-gray-200 px-2 py-2 text-sm'>
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
