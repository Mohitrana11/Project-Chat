import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsChatLeftText } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";

function SideBar() {
  const [active, setActive] = useState(null);

  const buttons = [
    { id: 1, icon: <FaUserCircle size={24} />, label: "Profile" },
    { id: 2, icon: <BsChatLeftText size={24} />, label: "Chat" },
    { id: 3, icon: <HiOutlineUserGroup size={28} />, label: "Groups" },
    { id: 4, icon: <IoAddCircleOutline size={28} />, label: "Add" },
  ];

  const handleClick = (id) => {
    setActive(id);
  };

  return (
    <div className="fixed  top-0 left-0 flex flex-col items-center text-white bg-black h-screen w-[40px] sm:w-[50px] md:w-[60px] pt-6 shadow-lg z-30 ">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => handleClick(btn.id)}
          aria-label={btn.label}
          className={`
            mb-6 flex justify-center items-center rounded-lg p-2
            transition-transform duration-500 ease-in-out
            ${
              active === btn.id
                ? "bg-indigo-600 scale-105 shadow-sm"
                : "hover:bg-indigo-500 hover:scale-105"
            }
            focus:outline-none  focus:ring-indigo-100
          `}
          style={{ WebkitTapHighlightColor: "transparent" }}
          type="button"
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
}

export default SideBar;
