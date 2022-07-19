const { Router } = require('express');
const { Product, Brand, Category, Image_Product, Gender, MainColor, Size, User, Stock, Store, Address } = require("../db")
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
                attributes: ['stock_product'],
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
            }]
        })
        res.status(200).send(productById)

    } catch (error) {
        next(error)
    }
});

router.post('/', checkJwt, checkPermissions ,async (req, res, next) => {
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

module.exports = router;
