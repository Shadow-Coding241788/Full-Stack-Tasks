import { Injectable } from '@nestjs/common';
import { CartItem, OrderSummary, Product, Review, User } from '../models/product.model';

@Injectable()
export class ShopService {
  private readonly products: Product[] = [
    new Product(
      1,
      'Smartphone',
      'Modern smartphone with premium features.',
      499,
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      'electronics',
    ),
    new Product(
      2,
      'Headphones',
      'Wireless headphones with clear sound.',
      129,
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'audio',
    ),
    new Product(
      3,
      'Running Shoes',
      'Comfortable shoes for everyday activity.',
      89,
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      'fashion',
    ),
    new Product(
      4,
      'Smart Watch',
      'Track your activity and stay connected.',
      159,
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      'wearables',
    ),
  ];

  private readonly reviews: Review[] = [
    new Review(1, 'Ali Khan', 5, 'Great website and very easy ordering process. My order arrived quickly.'),
    new Review(2, 'Sarah Ahmed', 4, 'The products were exactly as shown. I will definitely shop here again.'),
    new Review(3, 'Hamza Malik', 5, 'Simple interface, good prices, and a smooth checkout experience.'),
  ];

  private readonly users: User[] = [];

  private readonly cart: CartItem[] = [
    new CartItem(2, 'Headphones', 129, 1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80'),
    new CartItem(4, 'Smart Watch', 159, 2, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80'),
  ];

  getFeaturedProducts(): Product[] {
    return this.products;
  }

  getCustomerReviews(): Review[] {
    return this.reviews;
  }

  getCartItems(): CartItem[] {
    return this.cart;
  }

  getCartSummary(): OrderSummary {
    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return new OrderSummary(subtotal, 10);
  }

  registerUser(user: Omit<User, 'id'>): User {
    const newUser = new User(this.users.length + 1, user.fullName, user.email, user.password);
    this.users.push(newUser);
    return newUser;
  }

  loginUser(email: string, password: string): User | null {
    return this.users.find((user) => user.email === email && user.password === password) ?? null;
  }

  placeOrder(customer: { firstName: string; lastName: string; email: string; address: string; city: string; postalCode: string; paymentMethod: string; cardNumber?: string }): OrderSummary {
    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return new OrderSummary(subtotal, 10);
  }
}
