const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = require('./utils/config');
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false, 
})

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Category, Brand, Image_Product, Gender, Size, Stock, Store, Address, MainColor, CustomerReview, User } = sequelize.models

Brand.hasMany(Product)
Product.belongsTo(Brand)

Size.hasMany(Stock)
Stock.belongsTo(Size)

MainColor.hasMany(Stock)
Stock.belongsTo(MainColor)

Store.hasMany(Stock)
Stock.belongsTo(Store)

Product.belongsToMany(Stock,{through: "Product_Stock"})
Stock.belongsToMany(Product,{through: "Product_Stock"})

Address.hasOne(Store)
Store.belongsTo(Address)

Product.hasMany(Image_Product, {as: 'images'});
Image_Product.belongsTo(Product, {as: 'product'});

Gender.hasMany(Product)
Product.belongsTo(Gender)

Category.belongsToMany(Product, { through: 'Category_Products'})
Product.belongsToMany(Category, { through: 'Category_Products'})

Product.hasMany(CustomerReview, {as: 'reviews'})
CustomerReview.belongsTo(Product, {as: 'product'})

User.hasMany(CustomerReview, {as: 'reviews'})
CustomerReview.belongsTo(User, {as: 'user'})

module.exports = {
    db: sequelize,
    ...sequelize.models,
    Op
}