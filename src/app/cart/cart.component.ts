import { Component, OnInit } from '@angular/core';
import { IProductCart, IUserInfo } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private productService: ProductService, private route: Router) {}
  cart: IProductCart[] = [];
  total: number = 0;
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';
  isEmptyCart: boolean = true;
  isError: boolean = false;
  errorMessage = '';

  ngOnInit(): void {
    this.cart = this.productService.getProductCart();
    this.isEmptyCart = this.cart.length < 1;
    this.total = this.cart.reduce((accumulator, currentProduct) => {
      return Number(
        (accumulator += currentProduct.amount * currentProduct.price).toFixed(2)
      );
    }, 0);
  }

  handleValidate(userInfo: IUserInfo) {
    const { fullName, address, cardNumber } = userInfo;
    if (!fullName || !address || !cardNumber) {
      this.isError = true;
      this.errorMessage = 'User Info is required!';
      return;
    }
    if (
      fullName.length < 3 ||
      address.length < 6 ||
      cardNumber.toString().length !== 16
    ) {
      this.isError = true;
      this.errorMessage = 'Minimum characters!';
      return;
    }
  }
  onSubmit() {
    this.isError = false;
    const userInfo = {
      fullName: this.fullName,
      address: this.address,
      cardNumber: Number(this.cardNumber),
      total: this.total,
    };
    this.handleValidate(userInfo);
    if (this.isError) return;
    this.productService.postUserInfo(userInfo);
    this.productService.clearCar();
    this.route.navigate(['/confirmation']);
  }
}
