import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import ShelfForm from "./ShelfForm";
import { SlMenu } from "react-icons/sl";

export default function Navbar() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) navigate("/login");
  };

  return (
    <div>
      {/* Dialog form */}
      <Dialog dialogRef={dialogRef}>
        <ShelfForm dialogRef={dialogRef} />
      </Dialog>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-black py-4 px-8 drop-shadow-xl">
        <div>
          <a>Linkbrary</a>
        </div>
        <div className="hidden sm:flex items-center font-semibold text-base">
          <a
            className="transition-color duration-300 ease-in-out cursor-pointer hover:bg-blue-500 hover:rounded-md px-6 py-2"
            onClick={() => dialogRef.current?.showModal()}
          >
            Add Shelf
          </a>
          <a
            className="transition-color duration-300 ease-in-out cursor-pointer hover:bg-blue-500 hover:rounded-md px-6 py-2"
            onClick={logoutHandler}
          >
            Log out
          </a>
        </div>
        <div className="sm:hidden ">
          <SlMenu className="size-6" />
        </div>
      </nav>
    </div>
  );
}
