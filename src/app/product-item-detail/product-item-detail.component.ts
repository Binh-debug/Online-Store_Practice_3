import { Component, OnInit } from '@angular/core';
import { IProduct, IProductCart } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  constructor(private productService: ProductService) {}
  quantityProduct: number = 0;
  product: IProduct = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
  };
  ngOnInit(): void {
    this.product = { ...this.productService.getProductDetail() };
  }

  addToCart(product: IProduct) {
    console.log();
    if (this.quantityProduct < 1) {
      return;
    }
    const productToCart: IProductCart = {
      ...product,
      amount: this.quantityProduct,
    };

    this.productService.setProductToCart(productToCart);
  }
}
