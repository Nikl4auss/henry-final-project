const server = require('./src/app.js');
const db = require('./src/db.js');

db.sync({ force: true }).then(() => {
    server.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
})  
