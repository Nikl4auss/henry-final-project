const {PORT} = require('./src/utils/config')
const server = require('./src/app.js');
const {db} = require('./src/db');
const { populateProducts, populateProductsDos } = require('./src/utils/products');
const loadDefaultValues = require('./src/utils/loadDefaultValues');

loadDefaultValues
db.sync({ force: true }).then( async () => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        populateProducts()
        populateProductsDos();
        loadDefaultValues();
    });
})  
