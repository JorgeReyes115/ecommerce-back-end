const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  async(req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
 
});

router.get('/:id',  async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product }],
    });
    if (!category) {
      res.status(404).json({message: "No category found with id!"});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  } 

});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({message: "No category found with id!"});
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  } 
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({message: "no category found with id!"});
      return;
    }
    res.status(200).json(category);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
