import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FormProps = {
  type: string;
  url: string;
};

export default function Form({ type, url }: FormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("All fields are required");
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "An error occurred");
        return;
      }

      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(String(error));
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">{type}</legend>
          <label className="fieldset-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label className="fieldset-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button className="btn btn-neutral mt-4">{type}</button>
          <p className="text-center text-error">{message}</p>
          <div className="text-center m-4">
            {type === "Login" ? (
              <p>
                Don't have an account?{" "}
                <span>
                  <Link to="/signup" className="link link-info">
                    Click here to sign up!
                  </Link>
                </span>
              </p>
            ) : (
              <p>
                Have an account already?{" "}
                <span>
                  <Link to="/login" className="link link-info">
                    Click here to login!
                  </Link>
                </span>
              </p>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
}
