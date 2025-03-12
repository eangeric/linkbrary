import { useQuery } from "@tanstack/react-query";
import Navbar from "../Components/Navbar";
import Collapse from "../Components/Collapse";
import Links from "../Components/Links";
import { useState } from "react";

type Shelf = {
  _id: string;
  name: string;
  links: [];
};

type ShelvesResponse = { shelves: Shelf[] };

export default function Home() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const getShelves = async (): Promise<ShelvesResponse> => {
    try {
      const response = await fetch("http://localhost:4000/api/shelf/", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch shelves");
      }

      return response.json();
    } catch (error) {
      throw new Error("Error: " + error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["shelves"],
    queryFn: getShelves,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      // If in expandedIds remove it (close)
      // Else add to expandedIds (collapse)
      prev.includes(id)
        ? prev.filter((shelfId) => shelfId !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="mt-4 gap-4 grid grid-auto-rows-auto grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading && <p>Loading shelves</p>}
          {error && <p>{error.message}</p>}
          {!isLoading &&
            data?.shelves.map((shelf) => {
              return (
                <Collapse
                  key={shelf._id}
                  id={shelf._id}
                  name={shelf.name}
                  isExpanded={expandedIds.includes(shelf._id)}
                  toggleExpand={() => toggleExpand(shelf._id)}
                >
                  <Links links={shelf.links} />
                </Collapse>
              );
            })}
        </div>
      </div>
    </div>
  );
}
