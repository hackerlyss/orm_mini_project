const router = require('express').Router();
const { Travellers, Locations, Trips } = require('../../models');

// GET all travellers
router.get('/', async (req, res) => {
  try {
    const travellerData = await Travellers.findAll({
      include: [{ model: Locations }],
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single traveller
router.get('/:id', async (req, res) => {
  try {
    const travellerData = await Travellers.findByPk(req.params.id, {
      include: [{ model: Locations }],
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a traveller
router.post('/', async (req, res) => {
  try {
    const travellerData = await Travellers.create({
      traveller_id: req.body.traveller_id,
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a traveller
router.delete('/:id', async (req, res) => {
  try {
    const travellerData = await Travellers.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
