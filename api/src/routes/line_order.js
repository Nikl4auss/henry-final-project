const { Router } = require ('express')
const {Order, User, Line_order, Stock, MainColor, Size} = require("../db.js")

const router = Router();

router.post('/', async (req, res, next) => {
    const {
        totalPrice,
        status,
        payment_status,
        products, 
        idUser
    } = req.body


    try{
        const newOrder = await Order.create({
            totalPrice,
            status
        })

        const userOrder = await User.findOne({
            where: {
                id: idUser
            }
        })

        products.forEach(async prod => {
            const newLineOrder = await Line_order.create ({
                quantity: prod.quantity
            })

            const productStock = await Stock.findByPk(prod.id_stock)

            newLineOrder.setStock(productStock)

            newOrder.addLine_order(newLineOrder)
        })

        userOrder.addOrder(newOrder)

        res.send('El producto fue creado con éxito')

    } catch (error){
    console.log(error)
    }
});

router.get('/', async (req, res, next) => {

    try {
        const response = await Line_order.findAll({
            include: [{
                model: Stock,
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
    
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;