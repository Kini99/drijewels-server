import Admin from "../models/Admin.js";

export const createUserRoles = async (req, res) => {
  try {
    const superUser = await Admin.register(new Admin({
        email: req.body.email,
        role: req.body.role,
        name: req.body.name
    }), req.body.password);
    return res.status(201).json(superUser);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const editors = await Admin.find();
    return res.status(200).json(editors);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateUserById = async (req, res) => {
  const {id} = req.params;
    try {
      const user = await Admin.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
};

export const deleteUserById = async (req, res) => {
  const {id} = req.params;
    try {
      const user = await Admin.findOneAndDelete({ _id: id });
      if (user)
        return res.status(200).json({
          message: `Deleted admin/editor with ID: ${id}`,
        });
    } catch (error) {
      return res.status(500).json({
        error,
      });
  }
  return 0;
};