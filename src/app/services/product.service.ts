import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct, IProductCart, IUserInfo } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  url = 'assets/data.json';

  product: IProduct = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
  };

  cart: IProductCart[] = [];
  user: IUserInfo = {
    fullName: '',
    address: '',
    cardNumber: 0,
  };
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }

  setProductDetail(product: IProduct) {
    this.product = { ...product };
  }

  getProductDetail() {
    return this.product;
  }

  setProductToCart(product: IProductCart) {
    const isProductExist = this.cart.findIndex(
      (item) => item.id === product.id
    );
    if (isProductExist >= 0) {
      this.cart[isProductExist].amount += product.amount;
    } else {
      this.cart.push(product);
    }
  }

  getProductCart() {
    return this.cart;
  }

  postUserInfo(userInfo: IUserInfo) {
    this.user = { ...userInfo };
  }

  getUserInfo() {
    return this.user;
  }

  clearCar() {
    this.cart = [];
  }
}
