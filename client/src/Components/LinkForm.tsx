import { useState } from "react";

type LinkProps = {
  onClose: () => void;
};

export default function LinkForm({ onClose }: LinkProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/link/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        url,
        description,
      }),
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Add Link</legend>
          <label className="fieldset-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="input"
            placeholder="Google"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label className="fieldset-label" htmlFor="url">
            URL
          </label>
          <input
            type="text"
            className="input"
            placeholder="https://www.google.com"
            id="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
            }}
          />
          <label className="fieldset-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="textarea"
            placeholder="Search Engine"
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <div className="flex gap-8">
            <button
              type="button"
              className="flex-1 btn bg-red-800 mt-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="flex-1 btn bg-green-800 mt-4">
              Add
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
