import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center justify-center">
        <nav className="max-w-7xl lg:rounded-md flex justify-between  mt-0 lg:mt-5 w-full lg:w-11/12 z-[1]">
          <div className="flex items-center">
            <Image src={"/Logo.png"} alt="Logo" width={100} height={100} />
          </div>
          <div className="flex items-center relative space-x-2">
            <Link href={"/app"}>
              <button className="rounded-full px-6 py-[0.5rem] bg-indigo-600 hover:bg-indigo-700 text-gray-100 text-base">
                Open Bloory
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
