import { SlArrowDown, SlPlus } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { SlNote } from "react-icons/sl";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "./Dialog";
import ShelfForm from "./ShelfForm";

type Shelf = {
  _id: string;
  name: string;
  links: [];
};

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
  const queryClient = useQueryClient();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const deleteShelf = async (shelfId: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/shelf/${shelfId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to delete shelf");

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: deleteShelf,
    onMutate: async (shelfId) => {
      await queryClient.cancelQueries({ queryKey: ["shelves"] });

      const previousShelves = queryClient.getQueryData(["shelves"]);

      queryClient.setQueryData(
        ["shelves"],
        (oldData: { shelves: Shelf[] }) => ({
          shelves: oldData.shelves.filter((shelf) => shelf._id !== shelfId),
        })
      );

      return { previousShelves };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shelves"] });
    },
    onError: (_error, _shelfId, context) => {
      if (context?.previousShelves) {
        queryClient.setQueryData(["shelves"], context.previousShelves);
      }
    },
  });

  useEffect(() => {
    if (collapseRef.current) {
      setContentHeight(collapseRef.current.clientHeight);
    }
  }, [isExpanded, children]);

  return (
    <div>
      {/* Dialog form */}
      <Dialog dialogRef={dialogRef}>
        <ShelfForm dialogRef={dialogRef} shelfId={id} update={true} />
      </Dialog>
      <div
        onClick={toggleExpand}
        className={`relative w-[325px] bg-black flex justify-center items-center transition-all ease-in-out duration-300 p-2 text-lg font-bold cursor-pointer ${
          isExpanded ? "rounded-t-xl" : "delay-150"
        }`}
      >
        {name}
        <SlArrowDown
          className={`absolute right-0 mr-[11px] transition-all delay-150 duration-300 ease-in-out ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
        <div className="flex gap-[11px] absolute left-0 ml-[11px] ">
          <SlTrash
            onClick={(event) => {
              event.stopPropagation();
              mutate(id);
            }}
            className={`transition-all duration-300 ease-in-out hover:text-red-600 ${
              isExpanded ? "delay-150 opacity-100" : "opacity-0"
            }`}
          />
          <SlNote
            onClick={(event) => {
              event.stopPropagation();
              dialogRef.current?.showModal();
            }}
            className={`transition-all duration-300 ease-in-out hover:text-green-600 ${
              isExpanded ? "delay-150 opacity-100" : "opacity-0"
            }`}
          />
          <SlPlus
            className={`transition-all duration-300 ease-in-out hover:text-blue-600 ${
              isExpanded ? "delay-150 opacity-100" : "opacity-0"
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
