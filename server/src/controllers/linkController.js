import Link from "../database/schemas/linkSchema.js";

// Create a new link
export const addLink = async (req, res) => {
  const { shelf, description, url, position } = req.body;
  let { name } = req.body;

  if (!shelf || !url || !Number.isInteger(position)) {
    return res.status(400).json({ message: "Must specify all fields" });
  }

  if (position < 0) {
    return res
      .status(400)
      .json({ message: "Position must be an integer 0 or greater" });
  }

  if (!name) {
    name = url;
  }

  try {
    const newLink = new Link({
      shelf,
      name,
      description,
      url,
      position,
    });
    await newLink.save();
    res.status(200).json({ newLink });
  } catch (error) {
    res.status(500).json({ message: "Error creating link" });
  }
};

// Update a link
export const updateLink = async (req, res) => {
  const { id } = req.params;
  const { newUrl, newPosition } = req.body;

  const updateFields = {};

  if (!newUrl && !Number.isInteger(newPosition)) {
    return res.status(400).json({ message: "Must specify a field to change" });
  }

  if (newUrl) updateFields.url = newUrl;
  if (newPosition !== null || newPosition !== undefined) {
    if (newPosition < 0) {
      return res
        .status(400)
        .json({ message: "New position must be 0 or greater" });
    }
    updateFields.position = newPosition;
  }

  try {
    const updated = await Link.findByIdAndUpdate(id, updateFields);

    if (!updated) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating link" });
  }
};

// Delete a link
export const deleteLink = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Link.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting link" });
  }
};
