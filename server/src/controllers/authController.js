import User from "../database/schemas/userSchema.js";

export const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Must provide all fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const user = await User.create({ email, password });

    if (!user) {
      return res.status(500).json({ message: "Error adding user" });
    }

    req.session.userId = user._id;
    req.session.email = user.email;

    return res.status(200).json({ message: "Successfully signed up user" });
  } catch (error) {
    return res.status(500).json({ message: "Error signing up user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Must provide all fields" });
  }

  try {
    const user = await User.findOne({ email });
    const correctPassword = await user.comparePassword(password);
    if (!user || !correctPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    req.session.email = user.email;

    return res.status(200).json({ message: "Successfully logged in user" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in user" });
  }
};

export const logoutUser = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Already logged out" });
  }

  // Delete session on server side
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    // Remove from client side
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export const checkUser = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.status(200).json({ message: "User is logged in" });
};
