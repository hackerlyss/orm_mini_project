const router = require('express').Router();
const { Locations, Travellers, Trips } = require('../../models');

// GET all cards
router.get('/', async (req, res) => {
  try {
    const locationData = await Locations.findAll({
      include: [{ model: Travellers }],
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single location
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Travellers.findByPk(req.params.id, {
      include: [{ model: Travellers }, {through: Trips}],
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a card
router.post('/', async (req, res) => {
  try {
    const locationData = await Locations.create({
      location_id: req.body.location_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a card
router.delete('/:id', async (req, res) => {
  try {
    const locationData = await Locations.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
