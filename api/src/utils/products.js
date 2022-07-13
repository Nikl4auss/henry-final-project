const {
  Product,
  Brand,
  Category,
  Image_Product,
  Stock,
  Size,
  MainColor,
  Store,
  Gender,
} = require("../db");

const { ARRAYPRODUCT } = require("./arrayProduct");

const PRODUCTS = [
 
];

async function createStock(data) {
  const { stock_product, size, mainColor, store, product } = data;
  try {
    const newStock = await Stock.create({
      stock_product: parseInt(stock_product, 10),
    });

    const dbProduct = await Product.findOne({
      where: { name: product },
    });
    newStock.setProduct(dbProduct);

    if (mainColor) {
      const [dbMainColor] = await MainColor.findOrCreate({
        where: { name: mainColor },
      });
      newStock.setMainColor(dbMainColor);
    }

    if (size) {
      const [dbsize] = await Size.findOrCreate({
        where: { name: size.toString() },
      });
      newStock.setSize(dbsize);
    }

    if (store) {
      const [dbStore] = await Store.findOrCreate({
        where: { name: store },
      });
      newStock.setStore(dbStore);
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(data) {
  const { name, description, images, price, gender, brand, model, categories } = data;
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      model,
    });
    if(gender){
      const dbGender = await Gender.findOne({
        where: { name: gender}
      })
      newProduct.setGender(dbGender)
    }
    if (brand) {
      const [dbBrand] = await Brand.findOrCreate({
        where: { name: brand },
      });
      newProduct.setBrand(dbBrand);
    }

    if (categories.length) {
      await Promise.all(
        categories.map(async (category) => {
          const [dbCategory] = await Category.findOrCreate({
            where: { name: category },
          });
          newProduct.addCategory(dbCategory);
        })
      );
    }

    if (images.length) {
      await Promise.all(
        images.map(async (image) => {
          const [dbImage] = await Image_Product.findOrCreate({
            where: { image: image.image },
          });
          newProduct.addImage(dbImage);
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function populateProducts() {
  try {
    await Promise.all(
      PRODUCTS?.map(async (product) => {
        await createProduct(product);
      })
    );
  } catch (err) {
    console.log(err);
  }
}
async function populateProductsDos() {
  try {
    await Promise.allSettled(
      ARRAYPRODUCT.map(async (product) => {
        await createProduct({
          name: product.name,
          description: product.description,
          images: [
            { image: product.grid_picture_url, main: true },
            //  {image: product.main_picture_url, main: false},
            // {image: product.original_picture_url, main: false},
          ],
          price: product.price ? product.price : 10000,
          brand: product.brand,
          model: product.model,
          gender: product.gender[0],
          categories: [...product.categories],
        });
      })
    );

    await Promise.allSettled(
      ARRAYPRODUCT.map(async (product) => {
        [2,4,5,8,7,10,12,15].forEach(a =>{
          createStock({
            stock_product: 5,
            size: product.size[a],
            mainColor: product.mainColor,
            store: "Default",
            product: product.name,
          });
          createStock({
            stock_product: 3,
            size: product.size[a],
            mainColor: a%2===0?'Azul Marino': 'Rojo',
            store: "Default",
            product: product.name,
          });
      })
      })
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  populateProducts,
  populateProductsDos,
  createProduct,
};
