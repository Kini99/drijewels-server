import Subscriber from "../models/Subscriber.js";

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    return res.status(200).json({ subscribers });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getSubscriberById = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    return res.status(200).json(subscriber);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.create(req.body);
    return res.status(201).json(subscriber);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateSubscriberById = async (req, res) => {
  const {id} = req.params;
  try {
    const subscriber = await Subscriber.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(subscriber);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteSubscriberById = async (req, res) => {
  const {id} = req.params;
  try {
    const subscriber = await Subscriber.findOneAndDelete({ _id: id });
    if (subscriber)
      return res.status(200).json({
        message: `Deleted subscriber with ID: ${id}`,
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
  return 0;
};
