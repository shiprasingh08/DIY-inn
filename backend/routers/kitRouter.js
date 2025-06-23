const express = require('express');
const Model = require('../models/kitModel');
const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
        res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});
router.put('/update/:id', (req, res) => {
    console.log(req.body);
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}
);


router.get('/getbyid/:id', (req, res) => {
    console.log(req.params.id);
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});



router.get('/getall', async (req, res) => {
    try {
        const result = await Model.find().lean();
        if (!result) {
            return res.status(404).json({ message: 'No kits found' });
        }
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching kits:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});




router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});


module.exports = router;