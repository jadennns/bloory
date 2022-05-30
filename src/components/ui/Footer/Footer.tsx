import Link from "next/link";

export default function Footer() {
  return (
    <footer className='p-4 bg-swatch-2 shadow md:flex md:items-center md:justify-between md:p-6 '>
      <span className='text-sm text-gray-200 sm:text-center'>
        © 2022{" "}
        <a href='https://flowbite.com' className='hover:underline'>
          Jadennns
        </a>
      </span>
      <ul className='flex flex-wrap items-center mt-3 text-sm text-gray-200  sm:mt-0'>
        <li>
          <Link href={"https://github.com/jadennns/bloory"}>Github</Link>
        </li>
      </ul>
    </footer>
  );
}
