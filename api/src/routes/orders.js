const { Router } = require('express')
const { Order, User, Line_order, MainColor, Size, Image_Product, Product, Stock, Op } = require("../db.js");
const axios = require('axios')
const { sendEmail, getTemplateDespachado, getTemplateEntregado, getTemplateCancelado, getTemplateDevuelto,  } = require('../controllers/mail');
const { API_URL } = require('../utils/config.js');
const router = Router();


router.get('/', async (req, res, next) => {
    const { filter, payment } = req.query
    let conditions = {}
    let where = {}
    if(filter !== 'empty') {
        if(filter === 'Todos') conditions = {}
        else {
            where.status = filter;
            conditions.where = where
        }
    }   
    if(payment !== 'empty'){
        if(payment === 'Todos') conditions = {}
        else {
            where.payment_status = payment;
            conditions.where = where
        }
    }

    try {
        const response = await Order.findAll(conditions)
        res.json(response)
    } catch (err) {
        next(err)
    }
});

router.get('/:userId', async(req, res, next) => {
    const { userId } = req.params
    try{
            const response = await Order.findAll({
                where: {
                    UserId: userId
                }, 
                include: [
                    {
                        model: Line_order,
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
                                {
                                    model: Product,
                                    include: [{
                                        model: Image_Product,
                                        as: 'images'
                                    }]
                                },
                            ]
                        }]
                    }
                ]
            })
            res.json(response)

    }catch(err){
        next(err)
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { status, payment_status } = req.body

    try {
        const order = await Order.findOne({
            where: {
                id: id
            }
        })

        if(status.length > 0 && payment_status.length > 0){
            await order.update({
                status: status,
                payment_status: payment_status
            })
        } else if( status.length > 0) {
            await order.update({
                status: status
            })
        } else if (payment_status.length > 0) {
            await order.update({
                payment_status: payment_status
            })
        }
            if(status.length > 0) {
                let { data }  = await axios.get(`${API_URL}/order/${id}`)
                
                let name= data.User.name +' '+data.User.surname
                email= data.User.email;
                
                if(status === 'Despachado'){
                    let subject= 'Despachamos tu pedido';
                    mailTemplate = getTemplateDespachado(name, id)
                    await sendEmail(email, subject, mailTemplate )  
                }
                if(status === 'Entregado'){ //ok
                    let subject= 'Pedido Entregado';
                    mailTemplate = getTemplateEntregado(name, id)
                    await sendEmail(email, subject, mailTemplate )  
                }
                if(status === 'Cancelado'){
                    let subject= 'Pedido Cancelado'; //ok
                    mailTemplate = getTemplateCancelado(name, id)
                    await sendEmail(email, subject, mailTemplate )  
                }
                if(status === 'Devuelto'){
                    let subject= 'Devolución de Compra';
                    mailTemplate = getTemplateDevuelto(name, id)
                    await sendEmail(email, subject, mailTemplate )  
                }

            }

        res.send('La orden fue actualizada con éxito')
    } catch (error) {
        next(error)
    }
})

module.exports = router;
