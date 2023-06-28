const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try{
   const DataTag = Tag.findAll({
    include: [{model: Product, throught:ProductTag}],
   });
    if(!DataTag) {
      res.status(400).json({message: "no data to retrive"});
      return;
    }
    res.status(200).json(DataTag);
  } catch (err) {
    res.status(500).json(err);
  }
 
});

router.get('/:id', async(req, res) => {
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!tagId) {
      res.status(400).json({message: "no tag to retrive"});
      return;
    }
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try{
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try{
    const tagData = await Tag.update(
      {tag_name: req.body.tag_name},
    { 
      where: {id: req.params.id}
    });
    if(!tagData) {
      res.status(404).json({message: "no tag found"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async(req, res) => {
  try{
    const removeTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!removeTag) {
      res.status(404).json({message: "no tag found"});
      return;
    }
    res.status(200).json(removeTag);
  } catch (err) {
    res.status(500).json(err);
  } 
});

module.exports = router;
