import { useState } from "react";

type ShelfProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
};

export default function ShelfForm({ dialogRef }: ShelfProps) {
  const [name, setName] = useState("");

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/shelf/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      dialogRef.current?.close();
      console.log("Created shelf", data);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Add Shelf</legend>
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
          <div className="flex gap-8">
            <button
              type="button"
              className="flex-1 btn bg-red-800 mt-4"
              onClick={() => dialogRef.current?.close()}
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
