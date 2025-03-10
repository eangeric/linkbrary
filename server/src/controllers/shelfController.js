import Shelf from "../database/schemas/shelfSchema.js";

// Get all shelves
export const getShelves = async (req, res) => {
  const user = req.session.userId;

  try {
    const shelves = await Shelf.find({ user });

    if (!shelves.length) {
      return res.status(200).json({ message: "No shelves found", shelves: {} });
    }

    const shelvesWithLinks = await Promise.all(
      shelves.map(async (shelf) => {
        const links = await shelf.getLinks();
        return { ...shelf.toObject(), links };
      })
    );

    res.status(200).json({ shelves: shelvesWithLinks });
  } catch (error) {
    console.error("Error getting shelves:", error);
    res.status(500).json({ message: "Error getting shelves" });
  }
};

// Create a new shelf
export const createShelf = async (req, res) => {
  const { name } = req.body;
  const user = req.session.userId;

  if (!user || !name) {
    return res.status(400).json({ message: "Must specify all fields" });
  }

  try {
    const newShelf = new Shelf({ user, name });
    await newShelf.save();
    res.status(200).json({ newShelf });
  } catch (error) {
    res.status(500).json({ message: "Error creating shelf" });
  }
};

// Delete a shelf
export const deleteShelf = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Shelf.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Shelf not found" });
    }

    res.status(200).json({ message: "Shelf deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shelf" });
  }
};
