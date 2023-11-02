import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IProduct, IProductCart, IUserInfo } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @Input() cart: IProductCart[] = [];
  @Input() total: number = 0;
  @Input() isEmptyCart: boolean = true;
  @Output() buttonRemove: EventEmitter<IProduct> = new EventEmitter();

  constructor(private productService: ProductService, private route: Router) {}

  fullName: string = '';
  address: string = '';
  cardNumber: string = '';
  isError: boolean = false;
  errorMessage = '';

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
    this.productService.clearCart();
    this.route.navigate(['/confirmation']);
  }

  removeProduct(product: IProduct) {
    this.buttonRemove.emit(product);
  }
}
