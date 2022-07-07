const {PORT} = require('./src/utils/config')
const server = require('./src/app.js');
const {db} = require('./db.js');

db.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})  
