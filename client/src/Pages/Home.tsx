import Navbar from "../Components/Navbar";
import Collapse from "../Components/Collapse";
import { useEffect, useState } from "react";

type Shelf = {
  _id: string;
  name: string;
};

export default function Home() {
  const [shelves, setShelves] = useState<Shelf[]>([]);
  useEffect(() => {
    const getShelves = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/shelf/", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch shelves");
        }

        const data = await response.json();
        setShelves(data.shelves);
      } catch (error) {
        console.error("Error fetching shelves:", error);
      }
    };

    getShelves();
  }, []);

  return (
    <div>
      <Navbar />
      {shelves?.map((shelf) => {
        return <Collapse key={shelf._id} name={shelf.name} />;
      })}
    </div>
  );
}
