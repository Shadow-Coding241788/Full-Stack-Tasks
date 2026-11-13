import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CartItem, OrderSummary, Product, Review, User } from '../models/product.model';
import { ShopService } from '../services/shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('products')
  getProducts(): Product[] {
    return this.shopService.getFeaturedProducts();
  }

  @Get('reviews')
  getReviews(): Review[] {
    return this.shopService.getCustomerReviews();
  }

  @Get('cart')
  getCart(): { items: CartItem[]; summary: OrderSummary } {
    return {
      items: this.shopService.getCartItems(),
      summary: this.shopService.getCartSummary(),
    };
  }

  @Post('signup')
  signUp(@Body() body: { fullName: string; email: string; password: string }): User {
    return this.shopService.registerUser(body);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }): { success: boolean; user?: User } {
    const user = this.shopService.loginUser(body.email, body.password);

    if (!user) {
      return { success: false };
    }

    return { success: true, user };
  }

  @Post('checkout')
  checkout(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
      paymentMethod: string;
      cardNumber?: string;
    },
  ): { success: boolean; summary: OrderSummary } {
    const summary = this.shopService.placeOrder(body);
    return { success: true, summary };
  }
}
