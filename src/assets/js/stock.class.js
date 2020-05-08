export class Stock {
  constructor(id, {name, quantity, price, limit}) {
    this.stock_id = id;
    this.stock_name = name;
    this.stock_quantity = quantity;
    this.stock_buy_piece = price;
    this.stock_sell_limit = parseInt(limit);
  }
}
