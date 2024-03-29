import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CartStoreComponent } from './cart-store/cart-store.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-detail', component: ProductItemDetailComponent },
  { path: 'cart-detail', component: CartStoreComponent },
  { path: 'confirmation', component: ConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
