const Review = require('../models/Review');

exports.getAll = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('juegoId');
    res.json(reviews);
  } catch (err) { next(err); }
};

exports.getByGame = async (req, res, next) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId });
    res.json(reviews);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const rev = new Review(req.body);
    const saved = await rev.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const body = { ...req.body, fechaActualizacion: new Date() };
    const updated = await Review.findByIdAndUpdate(req.params.id, body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reseña eliminada' });
  } catch (err) { next(err); }
};
