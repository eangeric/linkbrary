import { SlArrowDown } from "react-icons/sl";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

type CollapseProps = {
  name: string;
};

export default function Collapse({ name }: CollapseProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <div className="flex flex-col items-center">
        <div
          className={`relative bg-black w-[350px] h-[50px] rounded-t-xl flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 ${
            collapsed ? "rounded-t-xl" : "delay-150 rounded-xl"
          }`}
          onClick={() => {
            setCollapsed((prev) => !prev);
          }}
        >
          <p className="font-bold select-none">{name}</p>
          <SlArrowDown
            className={`absolute right-5 transition-all ease-in-out duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`text-black bg-white w-[350px] rounded-b-xl flex flex-col justify-center items-center transition-all ease-in-out duration-300 select-none ${
            collapsed ? "delay-150 h-[50px] min-h-[50px]" : "h-0 opacity-0"
          }`}
        >
          <p className="w-full h-[50px] flex justify-between items-center p-2">
            Click the plus to add a new link.
            <FiPlus className="size-6 cursor-pointer" />
          </p>
        </div>
      </div>
    </div>
  );
}
