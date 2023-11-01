import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct, IProductCart } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: IProduct[] = [];

  quantityProduct = [0, 0, 0, 0, 0, 0];

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  handleClick(product: IProduct) {
    this.productService.setProductDetail(product);
  }

  addToCart(product: IProduct, indexProduct: number) {
    console.log();
    if (this.quantityProduct[indexProduct] < 1) {
      return;
    }
    const productToCart: IProductCart = {
      ...product,
      amount: this.quantityProduct[indexProduct],
    };
    this.productService.setProductToCart(productToCart);
  }
}
