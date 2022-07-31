export default function verifyStock(stock) {

  let totalStock = stock.reduce(
    (acc, cur) => parseInt(acc, 10) + parseInt(cur.stock_product, 10), 0  );

  let withStock = totalStock > 0 ? true : false;
  
  return withStock;
}
