import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const NavBar = () => {
  const [iconToDisplay, setIconToDisplay] = useState("AiOutlineMenu");

  return (
    <nav className="p-5 bg-[#002D74] shadow text-white md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <span className="text-2xl font=[Poppins] cursor-pointer">IOTA</span>
        <span className="text-3xl cursor-pointer md:hidden block">
          {iconToDisplay === "AiOutlineMenu" ? (
            <AiOutlineMenu onClick={() => setIconToDisplay("AiOutlineClose")} />
          ) : (
            <AiOutlineClose onClick={() => setIconToDisplay("AiOutlineMenu")} />
          )}
        </span>
      </div>
      <ul
        className={
          iconToDisplay === "AiOutlineMenu"
            ? "md:flex md:items-center z-[ -1] md:z-auto md:static absolute bg-[#002D74] w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500"
            : "md:flex md:items-center z-[ -1] md:z-auto md:static absolute bg-[#002D74] w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 top-[60px] opacity-100"
        }
      >
        <li className="mx-4 my-6 md:my-0">
          <Link
            href="/orders"
            className="text-xl hover:text-gray-500 duration-300"
          >
            ORDERS
          </Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="/" className="text-xl hover:text-gray-500 duration-300">
            ITEMS
          </Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link
            href="/inventory"
            className="text-xl hover:text-gray-500 duration-300"
          >
            INVENTORY
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
