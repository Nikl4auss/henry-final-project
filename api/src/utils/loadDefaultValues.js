const { Brand, Category, Gender, Size, MainColor } = require('../db')
const { BRANDS, CATEGORIES, GENDERS, SIZE, MAINCOLOR } = require('./const')



module.exports = function loadDefaultValues(){
    try {
        BRANDS.map(brand => {
            Brand.findOrCreate({
                where:{name: brand}})
        })
        CATEGORIES.map(category=>{
            Category.findOrCreate({
                where:{name: category}
            })
        })
        GENDERS.map(gender=>{
            Gender.findOrCreate({
                where: {name:gender}
            })
        })
        SIZE.map(size=>{
            Size.findOrCreate({
                where: {name:size}
            })
        })
       MAINCOLOR.map(mainColor=>{
           MainColor.findOrCreate({
            where: {name:mainColor.name},
            defaults: {name:mainColor.name, code:mainColor.code}

           })
       })
    } catch (error) {
        console.log(error)
    }
}