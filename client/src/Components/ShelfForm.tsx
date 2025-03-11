import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Shelf = {
  _id: string;
  name: string;
  links: [];
};

type ShelfProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
};

export default function ShelfForm({ dialogRef }: ShelfProps) {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const createShelf = async (newShelf: string) => {
    const response = await fetch("http://localhost:4000/api/shelf/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newShelf,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to create shelf");
    }

    if (response.ok) {
      return response.json();
    }
  };

  const { mutate } = useMutation({
    mutationFn: createShelf,
    onMutate: async (newShelf) => {
      await queryClient.cancelQueries({ queryKey: ["shelves"] });

      const previousShelves = queryClient.getQueryData<{ shelves: Shelf[] }>([
        "shelves",
      ]);

      const optimisticShelf: Shelf = {
        _id: Date.now().toString(),
        name: newShelf,
        links: [],
      };

      queryClient.setQueryData(
        ["shelves"],
        (oldData: { shelves: Shelf[] }) => ({
          shelves: [...oldData.shelves, optimisticShelf],
        })
      );

      setName("");
      dialogRef.current?.close();

      return { previousShelves };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shelves"] });
    },
    onError: (_error, _newShelf, context) => {
      if (context?.previousShelves) {
        queryClient.setQueryData(["shelves"], context.previousShelves);
      }
    },
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    mutate(name);
  };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <fieldset className="fieldset w-xs bg-black border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Add Shelf</legend>
        <label className="fieldset-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="input"
          placeholder="My New Shelf"
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
  );
}
