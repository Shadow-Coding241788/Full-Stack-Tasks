export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    category: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category;
  }
}

export class Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;

  constructor(id: number, customerName: string, rating: number, comment: string) {
    this.id = id;
    this.customerName = customerName;
    this.rating = rating;
    this.comment = comment;
  }
}

export class CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  image: string;

  constructor(
    productId: number,
    productName: string,
    price: number,
    quantity: number,
    image: string,
  ) {
    this.productId = productId;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
  }
}

export class User {
  id: number;
  fullName: string;
  email: string;
  password: string;

  constructor(id: number, fullName: string, email: string, password: string) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}

export class OrderSummary {
  subtotal: number;
  shipping: number;
  total: number;

  constructor(subtotal: number, shipping: number) {
    this.subtotal = subtotal;
    this.shipping = shipping;
    this.total = subtotal + shipping;
  }
}
