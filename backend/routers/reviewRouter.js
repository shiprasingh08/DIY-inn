const express = require('express');
const router = express.Router();
const ReviewModel = require('../models/reviewModel');

// Add a new review
router.post('/add', (req, res) => {
    const { product, user, rating, comment } = req.body;

    // Basic validation
    if (!product || !user || !rating || !comment) {
        return res.status(400).json({ 
            message: 'Missing required fields',
            details: {
                product: !product ? 'Product ID is required' : null,
                user: !user ? 'User ID is required' : null,
                rating: !rating ? 'Rating is required' : null,
                comment: !comment ? 'Comment is required' : null
            }
        });
    }

    const newReview = new ReviewModel({
        product,
        user,
        rating,
        comment,
        images: req.body.images || [],
        createdAt: new Date()
    });

    newReview.save()
        .then((result) => {
            // Populate with user info if needed
            ReviewModel.findById(result._id)
                .populate('user', 'name email')
                .then(populatedReview => {
                    res.status(201).json(populatedReview);
                })
                .catch(err => {
                    console.error('Error populating review:', err);
                    // Return the unpopulated result instead of error
                    res.status(201).json(result);
                });
        })
        .catch((err) => {
            console.error('Error adding review:', err);
            res.status(500).json({ 
                message: 'Error adding review', 
                error: err.message || 'Database error'
            });
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
