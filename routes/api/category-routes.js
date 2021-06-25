const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  console.log('req:', req.body)
  await Category.create(req.body)
  res.status(200).json(req.body)
} catch (err) {
      console.log(err);
    res.status(400).json(err);
}
  // Category.create(req.body)
  // .then((newCategory) => {
  //   // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  //   if (req.body.tagIds.length) {
  //     const productTagIdArr = req.body.tagIds.map((tag_id) => {
  //       return {
  //         product_id: product.id,
  //         tag_id,
  //       };
  //     });
  //     return ProductTag.bulkCreate(productTagIdArr);
  //   }
  //   // if no product tags, just respond
  //   res.status(200).json(product);
  // })
  // .then((productTagIds) => res.status(200).json(productTagIds))
  // .catch((err) => {
  //   console.log(err);
  //   res.status(400).json(err);
  // });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
