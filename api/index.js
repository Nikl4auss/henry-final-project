const {PORT} = require('./src/utils/config')
const server = require('./src/app.js');
const {db} = require('./src/db');
const { populateProducts, populateProductsDos } = require('./src/utils/products');
const loadDefaultValues = require('./src/utils/loadDefaultValues');
const { NODE_ENV } = require('./src/utils/config')
loadDefaultValues
db.sync({force: 
    NODE_ENV === 'TEST' || NODE_ENV === 'DEVELOPMENT' 
    ? true 
    : false})
    .then( async () => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        if(NODE_ENV === "TEST" || NODE_ENV === 'DEVELOPMENT'){
            console.log('you are here')
            populateProducts()
            populateProductsDos();
            loadDefaultValues();
        }
    });
})  
