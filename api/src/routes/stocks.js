const { Router } = require('express');
const {Product, Size, MainColor, Store, Address, Stock} = require("../db")

const router = Router();

router.post('/', async (req, res, next)=>{
    try{
    const {
       stock_product,
       size,
       mainColor,
       store,
       idProduct,
           } = req.body

     const newStock = await Stock.create({     
        stock_product: parseInt(stock_product,10)
       })

    const dbProduct = await Product.findByPk(parseInt(idProduct,10))
    newStock.setProduct(dbProduct)


if(mainColor){
    const [dbMainColor] = await MainColor.findOrCreate({
        where: {name: mainColor}
    })
    newStock.setMainColor(dbMainColor)
}

if(size){
    const [dbsize] = await Size.findOrCreate({
        where: {name: size.toString()}
    })
    newStock.setSize(dbsize)
}


if(store){   
    const [dbStore] = await Store.findOrCreate({
        where: {name: store}
    })
    newStock.setStore(dbStore)
}


    res.send(newStock)
    } catch (error){
        next(error)
    }
})

module.exports = router;
