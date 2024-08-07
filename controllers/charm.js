import Charm from "../models/Charm.js";
import allCharms from "../utils/charms.js";

export const getAllCharms = async (req, res) => {
  try {
    const charms = await Charm.find();
    return res.status(200).json(charms);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getCharmById = async (req, res) => {
  try {
    const charm = await Charm.findById(req.params.id);
    return res.status(200).json(charm);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createCharm = async (req, res) => {
  try {
    const charm = await Charm.create(req.body);
    return res.status(201).json(charm);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateCharmById = async (req, res) => {
  const { id } = req.params;
  try {
    const charm = await Charm.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(200).json(charm);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteCharmById = async (req, res) => {
  const { id } = req.params;
  try {
    const charm = await Charm.findOneAndDelete({ _id: id });
    if (charm)
      return res.status(200).json({
        message: `Deleted charm with ID: ${id}`,
      });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
  return 0;
};

export const importAllCharms = async (req, res) => {
  try {
    const products = await Charm.insertMany(allCharms);
    return res.status(200).json({
      message: `All ${allCharms.length} products were imported`,
      results: products,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
