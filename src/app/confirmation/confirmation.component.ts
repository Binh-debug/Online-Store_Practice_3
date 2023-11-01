import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  user: string = '';
  amount: number | undefined = 0;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    const { fullName, total } = this.productService.getUserInfo();
    this.user = fullName;
    this.amount = total;
  }
}
