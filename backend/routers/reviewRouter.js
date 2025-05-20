const express = require('express');
const router = express.Router();
const ReviewModel = require('../models/reviewModel');

// Add a new review
router.post('/add', (req, res) => {
    new ReviewModel(req.body).save()
        .then((result) => {
            result.populate('user').then((populatedResult) => {
                res.status(201).json(populatedResult);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error adding review' });
        });
});

// Get reviews by product ID
router.get('/getbyproduct/:id', (req, res) => {
    ReviewModel.find({ product: req.params.id })
        .populate('user', 'name email') // Only get name and email from user
        .sort({ createdAt: -1 }) // Sort by newest first
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching reviews' });
        });
});

// Delete a review
router.delete('/delete/:id', (req, res) => {
    ReviewModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.status(200).json({ message: 'Review deleted successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error deleting review' });
        });
});

module.exports = router;
