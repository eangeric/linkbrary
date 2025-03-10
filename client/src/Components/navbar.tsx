import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import ShelfForm from "./ShelfForm";

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
    <div className="navbar flex justify-end bg-neutral text-neutral-content">
      <div className="navbar-start">
        <p className="text-lg font-bold px-4 py-2 cursor-pointer select-none">
          Linkbrary
        </p>
      </div>
      <div className="navbar-center">
        <p
          className="btn btn-ghost text-lg"
          onClick={() => dialogRef.current?.showModal()}
        >
          Add Shelf
        </p>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost text-lg" onClick={logoutHandler}>
          Log out
        </a>
      </div>
      <Dialog dialogRef={dialogRef}>
        <ShelfForm dialogRef={dialogRef} />
      </Dialog>
    </div>
  );
}
