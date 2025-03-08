import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) navigate("/login");
  };

  return (
    <div className="navbar shadow-sm flex justify-end">
      <a className="btn btn-ghost text-xl" onClick={logoutHandler}>
        Log out
      </a>
    </div>
  );
}
