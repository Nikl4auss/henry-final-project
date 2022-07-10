const {PORT} = require('./src/utils/config')
const server = require('./src/app.js');
const {db} = require('./src/db');
const { populateProducts } = require('./src/utils/products')
db.sync({ force: true }).then( async () => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        populateProducts()
    });
})  
