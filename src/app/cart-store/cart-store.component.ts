import { Component, Input, OnInit } from '@angular/core';
import { IProduct, IProductCart } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-store',
  templateUrl: './cart-store.component.html',
  styleUrls: ['./cart-store.component.css'],
})
export class CartStoreComponent implements OnInit {
  constructor(private productService: ProductService) {}

  cart: IProductCart[] = [];
  total: number = 0;
  isEmptyCart: boolean = true;

  ngOnInit(): void {
    this.cart = this.productService.getProductCart();
    this.isEmptyCart = this.cart.length < 1;
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.total = this.cart.reduce((accumulator, currentProduct) => {
      return Number(
        (accumulator += currentProduct.amount * currentProduct.price).toFixed(2)
      );
    }, 0);
  }
  removeProductCart(product: IProduct) {
    this.productService.removeProduct(product);
    this.cart = this.productService.getProductCart();
    this.calculateTotalAmount();
    alert('Removed success');
  }
}
