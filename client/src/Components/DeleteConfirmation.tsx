import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  name: string;
  id: string;
};

type Shelf = {
  _id: string;
  name: string;
  links: [];
};

export default function DeleteConfirmation({
  dialogRef,
  name,
  id,
}: DeleteProps) {
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

  const queryClient = useQueryClient();

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

  return (
    <form autoComplete="off">
      <fieldset className="fieldset w-xs bg-black border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Confirm Delete</legend>
        <p className="text-base">Are you sure you want to delete "{name}"?</p>
        <div className="flex gap-8">
          <button
            type="button"
            className="flex-1 btn bg-gray-800 mt-4"
            onClick={() => dialogRef.current?.close()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 btn bg-red-800 mt-4"
            onClick={() => {
              mutate(id);
              dialogRef.current?.close();
            }}
          >
            Delete
          </button>
        </div>
      </fieldset>
    </form>
  );
}
