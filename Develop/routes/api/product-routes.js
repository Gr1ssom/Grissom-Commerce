const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      const productTags = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json({ product, productTags });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    // remove old product tags
    const removedProductTags = await ProductTag.destroy({
      where: { product_id: req.params.id },
    });
    // create new product tags
    if (req.body.tagIds && req.body.tagIds.length) {
      const newProductTags = req.body.tagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
      const productTags = await ProductTag.bulkCreate(newProductTags);
      res.status(200).json({ updatedProduct, productTags });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    await ProductTag.destroy({ where: { product_id: req.params.id } });
    await Product.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
