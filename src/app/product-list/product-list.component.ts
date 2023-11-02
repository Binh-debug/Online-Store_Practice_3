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

  quantityProduct: number[] = [];

  productToCart: IProductCart[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  handleClick(product: IProduct) {
    this.productService.setProductDetail(product);
  }
  changeAmount(product: IProduct, index: number) {
    this.productToCart[index] = {
      ...product,
      amount: this.quantityProduct[index],
    };
  }
  addToCart(indexProduct: number) {
    if (this.quantityProduct[indexProduct] < 1) {
      return;
    }
    this.productService.setProductToCart(this.productToCart[indexProduct]);

    alert('Added to cart success');
  }
}
