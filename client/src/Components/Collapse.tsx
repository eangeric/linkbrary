import { SlArrowDown, SlPlus } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { SlNote } from "react-icons/sl";
import { useState, useRef, useEffect } from "react";
import Dialog from "./Dialog";
import ShelfForm from "./ShelfForm";
import DeleteConfirmation from "./DeleteConfirmation";

type CollapseProps = {
  id: string;
  name: string;
  isExpanded: boolean;
  toggleExpand: () => void;
  children?: React.ReactNode;
};

export default function Collapse({
  id,
  name,
  isExpanded,
  toggleExpand,
  children,
}: CollapseProps) {
  const [contentHeight, setContentHeight] = useState(0);
  const collapseRef = useRef<HTMLDivElement>(null);
  const dialogRefEdit = useRef<HTMLDialogElement>(null);
  const dialogRefDelete = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (collapseRef.current) {
      setContentHeight(collapseRef.current.clientHeight);
    }
  }, [isExpanded, children]);

  return (
    <div>
      {/* Dialog edit form */}
      <Dialog dialogRef={dialogRefEdit}>
        <ShelfForm dialogRef={dialogRefEdit} shelfId={id} update={true} />
      </Dialog>
      {/* Dialog delete form */}
      <Dialog dialogRef={dialogRefDelete}>
        <DeleteConfirmation dialogRef={dialogRefDelete} name={name} id={id} />
      </Dialog>
      <div
        onClick={toggleExpand}
        className={`relative w-[325px] bg-black flex justify-center items-center transition-all ease-in-out duration-300 p-2 text-lg font-bold cursor-pointer ${
          isExpanded ? "rounded-t-xl" : "delay-150"
        }`}
      >
        <p
          className={`truncate transition-all ease-in-out ${
            isExpanded
              ? "max-w-[13ch] delay-50 duration-400"
              : "max-w-[26ch] duration-600"
          }`}
        >
          {name}
        </p>
        <SlArrowDown
          className={`absolute right-0 mr-[11px] transition-all delay-150 duration-300 ease-in-out ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
        <div className="flex gap-[11px] absolute left-0 ml-[11px] ">
          <SlTrash
            onClick={(event) => {
              event.stopPropagation();
              dialogRefDelete.current?.showModal();
              // mutate(id);
            }}
            className={`transition-all duration-300 ease-in-out hover:text-red-600 ${
              isExpanded ? "delay-150 opacity-100" : "opacity-0 invisible"
            }`}
          />
          <SlNote
            onClick={(event) => {
              event.stopPropagation();
              dialogRefEdit.current?.showModal();
            }}
            className={`transition-all duration-300 ease-in-out hover:text-green-600 ${
              isExpanded ? "delay-150 opacity-100" : "opacity-0 invisible"
            }`}
          />
          <SlPlus
            onClick={(event) => {
              event.stopPropagation();
            }}
            className={`transition-all duration-300 ease-in-out hover:text-blue-600 ${
              isExpanded ? "delay-150 opacity-100" : "opacity-0 invisible"
            }`}
          />
        </div>
      </div>
      <div
        className={`w-[325px] transition-all ease-in-out duration-300 overflow-hidden bg-white text-black text-lg rounded-b-xl ${
          isExpanded ? "delay-150 p-2" : "opacity-0 p-0"
        }`}
        style={{
          height: isExpanded ? contentHeight + 16 + "px" : 0,
        }}
      >
        <div ref={collapseRef}>{children}</div>
      </div>
    </div>
  );
}
