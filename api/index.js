const {PORT} = require('./src/utils/config')
const server = require('./src/app.js');
const {db, Product} = require('./src/db');
const { populateProducts, populateProductsDos } = require('./src/utils/products');
const loadDefaultValues = require('./src/utils/loadDefaultValues');
const { NODE_ENV } = require('./src/utils/config');
const populateUsers = require('./src/utils/populateUsers');


if(NODE_ENV === 'PRODUCTION'){
    db.sync().then(async () => {
        await server.listen(PORT, async () => {
            console.log(`Server running on port ${PORT}`);
                const products = await Product.findAll();
                if(!products.length){
                    console.log('No hay productos en la base de datos, se cargaran los productos por defecto');
                    populateProducts();
                    populateProductsDos();
                    loadDefaultValues();
                    populateUsers()
                }    

                
        })
    })
}
else {
    db.sync({ force: true })
        .then( async () => {
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
            populateProducts()
            populateProductsDos()
            loadDefaultValues()
            populateUsers()
        });
    })  
}
