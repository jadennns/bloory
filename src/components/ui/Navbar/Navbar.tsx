import Image from "next/image";
import Link from "next/link";

interface Props {
  buttons: {
    name: string;
    link: string;
  }[];
}

export default function Navbar({ buttons }: Props) {
  return (
    <>
      <div className='flex items-center justify-center'>
        <nav className='max-w-7xl lg:rounded-md flex justify-between  mt-0 lg:mt-5 w-full lg:w-11/12 z-[1]'>
          <div className='flex items-center'>
            <Image src={"/Logo.png"} alt='Logo' width={100} height={100} />
          </div>
          <div className='flex items-center relative space-x-2'>
            {buttons.map(({ name, link }, index) => (
              <Link href={link} key={index + 1}>
                <button className='rounded-full px-6 py-[0.5rem] bg-gray-100 text-gray-900 text-base'>
                  {name}
                </button>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
