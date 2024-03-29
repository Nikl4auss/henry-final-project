const { Router } = require('express');
const { Product, Brand, Category, Image_Product, Gender, MainColor, Size, User, Stock, Store, Review } = require("../db")
const checkJwt = require('../middleware/checkJwt')
const checkPermissions = require('../middleware/checkPermissions')
const router = Router();

router.get('/', async (req, res, next) => {
  const idProduct = req.query.id;
  try {
    let productById = await Product.findOne({
      where: {
        id: idProduct
      },
      include: [{
        model: Category,
        attributes: ['name']
      },
      {
        model: Brand,
        attributes: ['name']
      },
      {
        model: Image_Product,
        as: 'images',
        attributes: ['image']
      },
      {
        model: Gender,
        attributes: ['name']
      },
      {
        model: Stock,
        attributes: ['id', 'stock_product'],
        include: [
          {
            model: MainColor,
            attributes: ['name', 'code']
          },
          {
            model: Size,
            attributes: ['name']
          },
        ]
      },
      ]
    })
    res.status(200).send(productById)

  } catch (error) {
    next(error)
  }
});

router.post('/', checkJwt, checkPermissions, async (req, res, next) => {
  try {
    const {
      name,
      description,
      model,
      price,
      brand,
      category,
      image,
      stock_product,
      size,
      mainColor,
      store
    } = req.body
    const newProduct = await Product.create({
      name,
      description,
      model,
      price
    })
    const [dbBrand] = await Brand.findOrCreate({
      where: { name: brand }
    })
    dbBrand.addProduct(newProduct)

    if (category) {
      for (i = 0; i < category.length; i++) {
        const [dbCategory] = await Category.findOrCreate({
          where: { name: category[i] }
        })
        newProduct.addCategory(dbCategory)
      }
    }

    if (image) {
      for (i = 0; i < image.length; i++) {
        const [dbImage] = await Image_Product.findOrCreate({
          where: { image: image[i] }
        })
        newProduct.addImages(dbImage)
      }
      res.send(newProduct)
    }

    //*******Crea Instancia de Stock**** */
    const newStock = await Stock.create({
      stock_product: parseInt(stock_product, 10),
    });

    const dbProduct = await Product.findOne({
      where: { name: name },
    });
    newStock.setProduct(dbProduct);

    if (mainColor) {
      const [dbMainColor] = await MainColor.findOrCreate({
        where: { name: mainColor },
      });
      newStock.setMainColor(dbMainColor);
    }

    if (size) {
      const [dbsize] = await Size.findOrCreate({
        where: { name: size.toString() },
      });
      newStock.setSize(dbsize);
    }

    if (store) {
      const [dbStore] = await Store.findOrCreate({
        where: { name: store },
      });
      newStock.setStore(dbStore);
    }

  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params;
  const { status } = req.query
  try {
    const product = await Product.findOne({
      where: {
        id: id
      }
    })
  
    await product.update({
      status: status
    })
    res.send('El producto fue borrado con éxito')
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  const {
    id,
    name,
    model,
    description,
    images,
    price,
    Stocks,
    Gender,
    Categories
  } = req.body

  const brandOfFront = req.body.Brand

  try {
    const product = await Product.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Brand,
          attributes: ['name']
        },
        {
          model: Category,
          attributes: ['name']
        }
      ]
    })

    const categoriesOfProducts = product?.Categories.map(el => el.name)

    if (name !== product.name) {
      await product.update({
        name: name
      })
    }
    if (price !== product.price) {
      await product.update({
        price: price
      })
    }
    if (model !== product.model) {
      await product.update({
        model: model
      })
    }
    if (description !== product.description) {
      await product.update({
        description: description
      })
    }


    Stocks.forEach(async st => {
      const [stock, created] = await Stock.findOrCreate({
        where: {
          id: st.id
        }
      })
      if (created) {
        stock.addProduct(product)
      } else {
        if (stock.stock_product !== st.stock_product) {
          await stock.update({
            stock_product: st.stock_product
          })
        }
      }
    })

    const [brandDb] = await Brand.findOrCreate({
      where: {
        name: brandOfFront.name
      }
    })

    if (brandDb.name !== product.Brand.name) {
      product.setBrand(brandDb)
    }

    Categories?.forEach(async cat => {
      if (!categoriesOfProducts.includes(cat)) {
        const [category] = await Category.findOrCreate({
          where: {
            name: cat
          }
        })
        product.addCategory(category)
      }
    })

    categoriesOfProducts?.forEach(async cat => {
      if (!Categories?.includes(cat)) {
        const categ = await Category.findOne({
          where: {
            name: cat
          }
        })
        product.removeCategory(categ)
      }
    })

    res.send('El productio fue modificado con éxito')
  } catch (error) {
    console.log(error)
  }
})


router.get('/:id/reviews', async (req, res) => {
  const productId = Number(req.params.id)
  try {
    const reviews = await Review.findAll({
      where: {
        ProductId: productId
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    })

    res.status(200).send(reviews)
  } catch (error) {
    console.log(error)
  }

})

router.post('/:id/reviews', checkJwt, async (req, res) => {
  const productId = Number(req.params.id)
  console.log(productId)
  const { payload } = req.auth
  const { sub: user_id } = payload
  console.log(user_id)
  const {
    title,
    body,
    score
  } = req.body

  if (!title || !score) {
    return res.status(400).json({
      msg: "Falta titulo o mensaje"
    })
  }
  try {
    const product = await Product.findOne({
      where: {
        id: productId
      }
    })
    const user = await User.findOne({
      where: {
        id: user_id
      }
    })
    if (user && product) {
      const review = await Review.create({
        title,
        body,
        score,
      })
      await user.addReview(review)
      await product.addReview(review)
      return res.status(200).send(review)
    }
    return res.status(400).send('No se pudo crear la reseña, usuario o producto inexistente')
  } catch (error) {
    console.log(error)
    return res.send(500).json({
      msg: "No se pudo crear la reseña",
      error
    })
  }
})

module.exports = router;
